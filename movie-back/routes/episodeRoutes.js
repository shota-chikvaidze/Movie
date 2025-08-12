const express = require('express')
const episodeController = require('../controllers/episodeController')
const router = express.Router()

router.post('/', episodeController.createEpisode)
router.get('/:id', episodeController.episodeId)
router.get('/series/:seriesId', episodeController.getEpisodesBySeries)

module.exports = router