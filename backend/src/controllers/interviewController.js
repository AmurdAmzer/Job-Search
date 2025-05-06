const axios = require('axios');
const Favorite = require('../models/Favorite');
const InterviewPrep = require('../models/InterviewPrep');

const generateInterviewPrep = async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.body;

  try {
    const favoriteJob = await Favorite.findOne({ $or: [ { _id: jobId }, { sourceId: jobId } ] });

    if (!favoriteJob || !favoriteJob.title) {
      return res.status(404).json({ error: 'Job not found or missing title.' });
    }

    const jobTitle = favoriteJob.title;

    const prompt = `You are a career coach helping candidates prepare for interviews.
Generate a JSON object containing:
- 5 technical interview questions
- 3 behavioral interview questions
- 5 important study topics for the role
- 3 online study resources (include title and URL)
The questions should be specific to the role: "${jobTitle}"`;

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

    const raw = response.data.choices[0].message.content;
    console.log("🧪 Raw OpenAI content:", raw);

    const clean = raw.replace(/```json|```/g, '').trim();
    const prep = JSON.parse(clean);

    console.log('📦 Saving prep:', { userId, jobId, jobTitle });

    const saved = await InterviewPrep.create({
      userId,
      jobId,
      jobTitle,
      prep
    });

    res.json({ message: 'Interview prep created', prep });
  } catch (err) {
    console.error('❌ Prep error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to generate interview prep', detail: err.message });
  }
};

module.exports = { generateInterviewPrep };
