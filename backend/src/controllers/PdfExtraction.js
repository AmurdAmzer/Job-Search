import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import Favorite from './Favorite.js';
import InterviewPrep from './InterviewPrep.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer config for file uploads
const upload = multer({ dest: 'uploads/' });

// Resume Upload Skill Extraction and Job Matching
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const resumeText = data.text;

    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Extract only relevant job skills from resumes and return them as a JSON array of strings (like ["Excel", "JavaScript", "Leadership"]). Do not include any formatting or explanations.'
          },
          {
            role: 'user',
            content: `Extract skills from this resume:\n\n${resumeText}`
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const raw = openaiResponse.data.choices[0].message.content.trim();
    const cleanJson = raw.replace(/```json|```/g, '').trim();

    let skills;
    try {
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed)) {
        skills = parsed;
      } else if (typeof parsed === 'string') {
        skills = parsed.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        throw new Error('Unrecognized skills format from OpenAI');
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Failed to parse skills from OpenAI response',
        error: err.message,
        rawResponse: raw,
      });
    }

    const limitedSkills = skills.slice(0, 8);
    const formattedQuery = limitedSkills.map(skill => `"${skill}"`).join(' OR ');

    const jobLocation = req.body.location || 'remote';
    console.log('JSearch Query:', formattedQuery);
    console.log('Job Search Location:', jobLocation);

    const jsearchResponse = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query: formattedQuery,
        location: jobLocation,
        page: 1,
        num_pages: 5
      },
      headers: {
        'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });

    const jobListings = jsearchResponse.data.data.map(job => {
      const jobText = (job.job_description || '').toLowerCase();
      const matchCount = skills.filter(skill => jobText.includes(skill.toLowerCase())).length;
      const relevance = Math.round((matchCount / skills.length) * 100);
      const jobId = `${job.job_title}-${job.employer_name}`.replace(/\s+/g, '-').toLowerCase();

      return {
        jobId,
        jobTitle: job.job_title,
        employer: job.employer_name,
        JobDescription: job.job_description,
        location: `${job.job_city || 'Unknown'}, ${job.job_state || 'N/A'}`,
        applyLink: job.job_apply_link,
        relevanceScore: relevance,
        save: false
      };
    });

    res.json({ jobs: jobListings });

  } catch (error) {
    console.error('Resume processing error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('File cleanup error:', err.message);
      });
    }
  }
});

app.post('/favorites', async (req, res) => {
  const { userId, jobId, jobTitle, employer, applyLink } = req.body;

  try {
    const exists = await Favorite.findOne({ userId, jobId });
    if (exists) {
      return res.json({ message: 'Already saved' });
    }

    const favorite = new Favorite({ userId, jobId, jobTitle, employer, applyLink });
    await favorite.save();
    res.json({ message: 'Saved to favorites', favorite });

  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite', detail: err.message });
  }
});

app.get('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await Favorite.find({ userId }).sort({ savedAt: -1 });
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites', detail: err.message });
  }
});

app.post('/interview-prep', async (req, res) => {
  const {
    userId = 'demo-user',
    jobId = 'unknown-job',
    jobTitle,
    jobDescription,
    JobDescription,
    skills = []
  } = req.body;

  const finalJobDescription = jobDescription || JobDescription;

  if (!jobTitle || !finalJobDescription) {
    return res.status(400).json({ error: "Missing jobTitle or jobDescription" });
  }

  const prompt = `
You are a career coach helping candidates prepare for job interviews.

Based on the following job title and description, generate:
1. 3–5 technical or role-specific interview questions
2. 2–3 behavioral questions
3. 3–5 study topics or skill areas to review
4. A list of 3–5 helpful study resources with links (websites, docs, tutorials)

Job Title: ${jobTitle}
Job Description: ${finalJobDescription}
Candidate Skills: ${skills.join(', ') || 'N/A'}

Return your response as a JSON object with the keys:
- "technicalQuestions"
- "behavioralQuestions"
- "studyTopics"
- "studyResources" (each item should have "title" and "url")

Do not include any markdown or explanation.
`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content.trim();
    const clean = content.replace(/```json|```/g, '').trim();
    const interviewPrep = JSON.parse(clean);

    const savedPrep = await InterviewPrep.create({
      userId,
      jobId,
      jobTitle,
      jobDescription: finalJobDescription,
      skills,
      prep: interviewPrep
    });

    res.json({ message: 'Interview prep generated and saved', data: savedPrep });

  } catch (err) {
    console.error("Interview prep error:", err);
    res.status(500).json({ error: "Failed to generate interview prep", detail: err.message });
  }
});

app.get('/interview-prep/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const prepResults = await InterviewPrep.find({ userId }).sort({ createdAt: -1 });
    res.json({ prepResults });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interview prep history', detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
