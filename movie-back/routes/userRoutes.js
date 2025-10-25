const express = require('express')
const userController = require('../controllers/userController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getUser', protect, userController.getUser)

module.exports = router