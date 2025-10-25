const express = require('express')
const ratingController = require('../controllers/ratingController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/post-rating/:movieId', protect, ratingController.rate)
router.get('/get-user-rating/:userId', protect, ratingController.getUserRating)
router.get('/rating-summary', ratingController.ratingSummary)
router.delete('/delete-rating/:id', protect, ratingController.deleteUserRating)

module.exports = router