const express = require('express')
const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    movieId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' },
    rating: { type: Number,  min: 1, max: 5, required: true },
    postedAt: { type: Date, default: Date.now, required: true },
})

ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true })
ratingSchema.index({ movieId: 1 })

module.exports = mongoose.model('Rating', ratingSchema)