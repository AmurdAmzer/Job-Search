const Favorite = require('../models/Favorite');

const saveFavorite = async (req, res) => {
  const {
    userId,
    jobId,
    sourceId,
    title,
    company,
    location,
    description,
    requirements,
    salary,
    jobType,
    applicationDeadline,
    externalUrl,
    source
  } = req.body;

  try {
    const exists = await Favorite.findOne({ userId, sourceId });
    if (exists) return res.json({ message: 'Already saved' });

    const favorite = new Favorite({
      userId,
      sourceId,
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      applicationDeadline,
      externalUrl,
      source
    });

    await favorite.save();
    res.json({ message: 'Saved to favorites', favorite });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite', detail: err.message });
  }
};

const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId }).sort({ savedAt: -1 });
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites', detail: err.message });
  }
};

const deleteFavorite = async (req, res) => {
  const { userId, sourceId } = req.params;
  console.log("🔍 DELETE called with:", userId, sourceId); // Add this!

  try {
    const result = await Favorite.findOneAndDelete({ userId, sourceId });
    if (!result) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Favorite removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete favorite', detail: err.message });
  }
};

module.exports = { saveFavorite, getFavorites, deleteFavorite };
