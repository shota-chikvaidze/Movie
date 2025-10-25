const express = require('express')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    myList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)