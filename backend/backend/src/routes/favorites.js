const express = require('express');
const { saveFavorite, getFavorites } = require('../controllers/favoritesController');
const router = express.Router();

router.post('/', saveFavorite);
router.get('/:userId', getFavorites);

module.exports = router;
