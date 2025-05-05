const axios = require('axios');
const InterviewPrep = require('./InterviewPrep');

const generateInterviewPrep = async (req, res) => {
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
You are a career coach helping candidates prepare for job interviews...

Job Title: ${jobTitle}
Job Description: ${finalJobDescription}
Candidate Skills: ${skills.join(', ') || 'N/A'}

Return your response as a JSON object with the keys:
- "technicalQuestions"
- "behavioralQuestions"
- "studyTopics"
- "studyResources" (each item should have "title" and "url")
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

    res.json({ message: 'Interview prep generated', data: savedPrep });

  } catch (err) {
    console.error("Interview prep error:", err);
    res.status(500).json({ error: "Failed to generate interview prep", detail: err.message });
  }
};

const getInterviewPrepHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const prepResults = await InterviewPrep.find({ userId }).sort({ createdAt: -1 });
    res.json({ prepResults });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interview prep history', detail: err.message });
  }
};

module.exports = { generateInterviewPrep, getInterviewPrepHistory };
