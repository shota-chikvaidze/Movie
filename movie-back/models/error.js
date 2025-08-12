const express = require('express')
const mongoose = require('mongoose')

const errorSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
}, {timestamps: true})


module.exports = mongoose.model('Error', errorSchema)