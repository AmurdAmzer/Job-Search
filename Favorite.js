import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({ // Schema that saves jobs under the "favorite" category
  userId: String,
  jobId: String,
  jobTitle: String,
  employer: String,
  applyLink: String,
  savedAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
