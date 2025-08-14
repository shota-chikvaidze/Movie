const express = require('express')
const mongoose = require('mongoose')

const actorSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Actor', actorSchema)