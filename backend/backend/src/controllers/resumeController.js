const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');

const handleResumeUpload = async (req, res) => {
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
            content: 'Extract only relevant job skills from resumes and return them as a JSON array of strings.'
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
      skills = Array.isArray(parsed) ? parsed : parsed.split(',').map(s => s.trim());
    } catch (err) {
      return res.status(500).json({ message: 'Failed to parse OpenAI response', raw });
    }

    const limitedSkills = skills.slice(0, 8);
    const formattedQuery = limitedSkills.map(skill => `"${skill}"`).join(' OR ');
    const jobLocation = req.body.location || 'remote';

    const jsearchResponse = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: { query: formattedQuery, location: jobLocation, page: 1, num_pages: 1 },
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
    console.error('Resume error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('File cleanup error:', err.message);
      });
    }
  }
};

module.exports = { handleResumeUpload };
