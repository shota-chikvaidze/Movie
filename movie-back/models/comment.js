const express = require('express')
const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' },
    postedAt: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)