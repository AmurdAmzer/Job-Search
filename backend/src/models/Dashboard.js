const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { _id: true }); // ensures each note gets a unique _id

const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  savedNotes: [noteSchema],
});

module.exports = mongoose.model('Dashboard', dashboardSchema);