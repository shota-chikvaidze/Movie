const express = require('express')
const seriesController = require('../controllers/seriesController')
const router = express.Router()

router.get('/all-series', seriesController.getAllSeries)
router.get('/series-id/:id', seriesController.getSeriesId)
router.get('/new-added-series', seriesController.getNewReleasedSeries)
router.post('/create-series', seriesController.createSeries)

module.exports = router