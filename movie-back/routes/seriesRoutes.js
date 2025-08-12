const express = require('express')
const seriesController = require('../controllers/seriesController')
const router = express.Router()

router.get('/all-series', seriesController.getAllSeries)
router.get('/Series-id/:id', seriesController.getSeriesId)

module.exports = router