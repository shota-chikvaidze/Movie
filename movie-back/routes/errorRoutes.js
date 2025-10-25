const express = require('express')
const errorController = require('../controllers/errorController')
const router = express.Router()

router.post('/', errorController.postComment)

module.exports = router