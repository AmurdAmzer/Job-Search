const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Check if MongoDB URI is available
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Define PORT
const PORT = process.env.PORT || 9999;


// Import models
const Job = require('./models/Job');
const Favorite = require('./models/Favorite');
const User = require('./models/User');
const Application = require('./models/Application');
const InterviewPrep = require('./models/InterviewPrep');

// API ENPOINTS FOR JOBS
// GET jobs saved in mongodb
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET job by id (with case-insensitive and partial matching)
router.get('/jobs/search', async (req, res) => {
  const { title, company, location, jobType } = req.query;
  const filter = {};

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }
  if (company) {
    filter.company = { $regex: company, $options: 'i' };
  }
  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }
  if (jobType) {
    filter.jobType = { $regex: jobType, $options: 'i' };
  }
  try {
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST job to mongo
router.post('/jobs/upload', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    console.log('Job uploaded successfully!')
    res.status(201).json({ message: 'Job uploaded successfully', job });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ message: 'Failed to upload job' });
  }
});

// GET favorites from mongo (get all favorites jobs for a user)
router.get('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId }).sort({ savedAt: -1 });
    res.json(favorites); // ← removed outer { favorites } for consistency
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites', detail: err.message });
  }
});

// POST a job to favorites in mongo (save a favorite job)
router.post('/favorites', async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.status(201).json({ message: 'Favorite saved', favorite });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite', detail: err.message });
  }
});

// DELETE a job from favorites
router.delete('/favorites', async (req, res) => {
  const { userId, sourceId } = req.body;

  try {
    const deleted = await Favorite.findOneAndDelete({ userId, sourceId });

    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Favorite deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete favorite', detail: err.message });
  }
});

// POST a user (register a new user)
router.post('/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});


// POST a user logging in
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with basic user info
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// GET user's profile by id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve user', error: err.message });
  }
});

// UPDATE a user's profile
router.put('/users/:id', async (req, res) => {
  const { name, avatar, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

// DELETE a user's profile
router.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});


// GET applications by user id
router.get('/applications/:userId', async (req, res) => {
  try {
    const applications = await Application.find({ user: req.params.userId }).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications', error: err.message });
  }
});

// POST applications (create one)
router.post('/applications', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit application', error: err.message });
  }
});

// UPDATE an application
router.put('/applications/:id', async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application updated', application: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application', error: err.message });
  }
});

// DELETE an application
router.delete('/applications/:id', async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete application', error: err.message });
  }
});

// POST - create an interview prep 
router.post('/interview-prep', async (req, res) => {
  try {
    const interviewPrep = new InterviewPrep(req.body);
    await interviewPrep.save();
    res.status(201).json({ message: 'Interview prep saved', data: interviewPrep });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save prep', error: err.message });
  }
});

// Update an interview prep
router.put('/interview-prep/:id', async (req, res) => {
  try {
    const updated = await InterviewPrep.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Prep not found' });
    }

    res.json({ message: 'Prep updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update prep', error: err.message });
  }
});

// Delete an interview prep
router.delete('/interview-prep/:id', async (req, res) => {
  try {
    const deleted = await InterviewPrep.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Prep not found' });
    }

    res.json({ message: 'Interview prep deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete prep', error: err.message });
  }
});

// get prep by id
router.get('/interview-prep/:id', async (req, res) => {
  try {
    const prep = await InterviewPrep.findById(req.params.id);

    if (!prep) {
      return res.status(404).json({ message: 'Prep not found' });
    }

    res.json(prep);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve prep', error: err.message });
  }
});



// JOB SEARCH STUFF
async function searchJobs(queryText) {
  const formattedQuery = queryText
    .split('\n')
    .filter(line => line.startsWith('-'))
    .map(skill => skill.replace('-', '').trim())
    .join(', ');

  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      headers: {
        'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,  // Uses .env securely
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      params: {
        query: formattedQuery,
        page: '1',
        num_pages: '1',
        country: 'us',
      },
    });

    return response.data;
  } catch (error) {
    console.log("API KEY:", process.env.JSEARCH_API_KEY);
    console.error('Error fetching job search data:', error.response?.data || error.message);
    throw new Error('Error fetching job data');
  }
}



app.get('/api/search-jobs', async (req, res) => {
  const { queryText } = req.query;

  if (!queryText) {
    return res.status(400).json({ message: 'Missing queryText parameter' });
  }

  try {
    const jobResults = await searchJobs(queryText);
    res.json({ jobs: jobResults.data });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});


// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });