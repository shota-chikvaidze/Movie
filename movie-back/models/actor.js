const express = require('express')
const mongoose = require('mongoose')

const actorSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    born: { type: String, required: true },
    height: { type: Number, required: true },
    movies: { type: [String], required: true },
    rewards: { type: [String], required: true }
}, { timestamps: true })

module.exports = mongoose.model('Actor', actorSchema)