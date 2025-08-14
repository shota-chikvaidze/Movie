const express = require('express')
const mongoose = require('mongoose')

const episodeSchema = mongoose.Schema({
    title: { type: String,  required: true},
    videoPath: { type: String,  required: true },
    series: { type: mongoose.Schema.Types.ObjectId,  ref: 'Series',  required: true },
    createdAt: { type: Date,  default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model('Episode', episodeSchema)