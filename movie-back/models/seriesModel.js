const express = require('express')
const mongoose = require('mongoose')

const seriesSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Object, required: true },
    year: { type: Number, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    type: { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    starring: [
        {
            actor: { type: String, required: true },
            role: { type: String, required: true },
        }
    ],
    rating: [
        {
            source: { type: String, required: true },
            score: { type: Number, required: true },
            date: { type: Date, required: true },
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Series', seriesSchema)