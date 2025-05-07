const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

// GET user dashboard data
router.get('/:userId', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.params.userId });
    res.json(dashboard || { savedNotes: [] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: err });
  }
});

// PUT to save a new note
router.put('/:userId', async (req, res) => {
  const { newNote } = req.body;
  if (!newNote || !newNote.title || !newNote.content) {
    return res.status(400).json({ message: 'Missing note title or content' });
  }

  try {
    let dashboard = await Dashboard.findOne({ userId: req.params.userId });

    if (!dashboard) {
      dashboard = new Dashboard({ userId: req.params.userId, savedNotes: [newNote] });
    } else {
      dashboard.savedNotes.push(newNote);
    }

    await dashboard.save();
    res.status(200).json({ message: 'Note saved successfully', savedNotes: dashboard.savedNotes });
  } catch (err) {
    res.status(500).json({ message: 'Error saving note', error: err });
  }
});

// DELETE note by noteId
router.delete('/:userId/note/:noteId', async (req, res) => {
    const { userId, noteId } = req.params;
  
    try {
      const dashboard = await Dashboard.findOne({ userId });
      if (!dashboard) return res.status(404).json({ message: 'Dashboard not found' });
  
      dashboard.savedNotes = dashboard.savedNotes.filter(
        (note) => String(note._id) !== String(noteId)
      );
  
      await dashboard.save();
      res.json({ message: 'Note deleted', savedNotes: dashboard.savedNotes });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting note', error: err });
    }
  });

  // UPDATE a specific note by _id
router.put('/:userId/note/:noteId', async (req, res) => {
    const { userId, noteId } = req.params;
    const { title, content } = req.body;
  
    if (!title || !content) {
      return res.status(400).json({ message: 'Missing title or content' });
    }
  
    try {
      const dashboard = await Dashboard.findOne({ userId });
      if (!dashboard) return res.status(404).json({ message: 'Dashboard not found' });
  
      const note = dashboard.savedNotes.id(noteId);
      if (!note) return res.status(404).json({ message: 'Note not found' });
  
      note.title = title;
      note.content = content;
      await dashboard.save();
  
      res.json({ message: 'Note updated', savedNotes: dashboard.savedNotes });
    } catch (err) {
      res.status(500).json({ message: 'Error updating note', error: err });
    }
  });

module.exports = router;
