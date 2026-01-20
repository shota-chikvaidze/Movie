const express = require('express')
const movieController = require('../controllers/movieController')
const router = express.Router()

router.get('/', movieController.getAllMovies)
router.get('/movies-by-id/:id', movieController.getMoviesId)
router.post('/create-movie', movieController.createMovies)
router.get('/featured-movies', movieController.getFeaturedMovies)
router.get('/new-added-movies', movieController.getNewReleasedMovies)

module.exports = router