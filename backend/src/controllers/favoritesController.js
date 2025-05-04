const Favorite = require('./Favorite');

const saveFavorite = async (req, res) => {
  const { userId, jobId, jobTitle, employer, applyLink } = req.body;

  try {
    const exists = await Favorite.findOne({ userId, jobId });
    if (exists) return res.json({ message: 'Already saved' });

    const favorite = new Favorite({ userId, jobId, jobTitle, employer, applyLink });
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

module.exports = { saveFavorite, getFavorites };
