const express = require('express')
const commentController = require('../controllers/commentController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/post-comment', protect, commentController.postComment)
router.get('/get-comment', commentController.getComments)
router.get('/get-user-comment/:userId', protect, commentController.getUserComments)
router.delete('/delete-comment/:id', protect, commentController.deleteComments)

module.exports = router