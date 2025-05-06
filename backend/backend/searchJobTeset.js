const axios = require('axios');
require('dotenv').config(); // Make sure .env contains RAPIDAPI_KEY

const searchJobs = async (query) => {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: query,
      page: '1',
      num_pages: '1'
    },
    headers: {
      'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    return [];
  }
};

// === Run the search ===
const queryText = 'developer jobs in chicago';

searchJobs(queryText).then(results => {
  console.log(`Found ${results.length} job(s) for "${queryText}":`);
  console.log(results);
});
