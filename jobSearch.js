import axios from 'axios';


const JSEARCH_API_KEY = process.env.RAPIDAPI_KEY;  // Get the RapidAPI key from .env

async function searchJobs(queryText) {
  const formattedQuery = queryText
    .split('\n')
    .filter(line => line.startsWith('-'))
    .map(skill => skill.replace('-', '').trim())
    .join(', ');

  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      headers: {
        'X-RapidAPI-Key': JSEARCH_API_KEY,  // Make sure to use the actual RapidAPI key
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      params: {
        query: formattedQuery,
        page: '1',
        num_pages: '1',
        country: 'us',
      },
    });

    return response.data;  // Return the response data to be used in PdfExtraction.js
  } catch (error) {
    console.error('Error fetching job search data:', error);
    throw new Error('Error fetching job data');
  }
}

app.post('/favorites', async (req, res) => {
  const { userId, jobId, jobTitle, employer, applyLink } = req.body;

  try {
    const exists = await Favorite.findOne({ userId, jobId });
    if (exists) return res.json({ message: "Already saved" });

    const favorite = new Favorite({ userId, jobId, jobTitle, employer, applyLink });
    await favorite.save();

    res.json({ message: "Saved to favorites", favorite });
  } catch (err) {
    res.status(500).json({ error: "Failed to save favorite", detail: err.message });
  }
});

app.get('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await Favorite.find({ userId }).sort({ savedAt: -1 });
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites", detail: err.message });
  }
});


export { searchJobs };
