const express = require('express')
const actorController = require('../controllers/actorController')
const router = express.Router()

router.get('/get-actors', actorController.getActors)
router.post('/post-actors', actorController.postActors)
router.get('/get-actors-details/:id', actorController.getActorsDetails)

module.exports = router