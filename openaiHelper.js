import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function extractSkills(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You extract only relevant skills from resumes. Respond with a JSON array of strings, like ["Java", "Excel", "Leadership"]. Do not return anything else.',
        },
        {
          role: 'user',
          content: `Extract relevant skills from the following resume:\n\n${text}`,
        },
      ],
      temperature: 0.2,
    });

    const raw = completion.choices[0].message.content.trim();
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
      if (Array.isArray(parsed)) {
        return parsed;
      } else if (typeof parsed === 'string') {
        return parsed.split(',').map(s => s.trim()).filter(Boolean);
      } else if (parsed.technicalSkills && parsed.softSkills) {
        return [...parsed.technicalSkills, ...parsed.softSkills];
      } else {
        throw new Error('Unrecognized structure');
      }
    } catch (parseErr) {
      console.error('Failed to parse OpenAI response:', parseErr.message);
      console.log('Raw response from OpenAI:\n', raw);
      return [];
    }
  } catch (error) {
    console.error('Error with OpenAI:', error);
    return [];
  }
}

export default extractSkills;
