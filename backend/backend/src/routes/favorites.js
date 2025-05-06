const express = require('express');
const { saveFavorite, getFavorites, deleteFavorite } = require('../controllers/favoritesController');
const router = express.Router();

router.post('/', saveFavorite);
router.get('/:userId', getFavorites);
router.delete('/:userId/:sourceId', deleteFavorite);

module.exports = router;
