const express = require('express')
const actorController = require('../controllers/actorController')
const router = express.Router()

router.get('/', actorController.getActors)

module.exports = router