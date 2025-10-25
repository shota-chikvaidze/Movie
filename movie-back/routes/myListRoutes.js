const express = require('express')
const myListController = require('../controllers/myListController')
const protect = require('../middleware/protect')
const router = express.Router()

router.put('/', protect, myListController.movieList)
router.get('/', protect, myListController.getMyList)
router.delete('/delete-movie/:id', protect, myListController.deleteList)

module.exports = router