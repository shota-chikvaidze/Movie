const express = require('express')
const Actor = require('../models/actor')

exports.getActors = async (req, res) => {

    try{

        const page = parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit || 20)
        const skip = (page - 1) * limit

        const actors = await Actor.find().limit(limit).skip(skip)
        const totalActors = await Actor.countDocuments()
        
        res.status(200).json({
            message: 'actor received successfuly',
            actors,
            currentPage: page,
            totalPage: Math.ceil(totalActors / limit)
        })

    }catch(err){
        res.status(500).json({message: 'error getting actors'})
    }

}

exports.postActors = async (req, res) => {
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ message: 'Array of actors required' });
        }

        const actorList = await Actor.insertMany(req.body);
        res.status(201).json({ message: 'actors created successfully', actors: actorList });

    } catch (err) {
        res.status(500).json({ message: 'Error creating actors', error: err.message });
    }
}

exports.getActorsDetails = async (req, res) => {
    try{

        const getActorsDetail = await Actor.findById(req.params.id)
        if(!getActorsDetail){
            return res.status(404).json({message: 'actor details not found'})
        }
        res.status(200).json({getActorsDetail})
        
    }catch(err){
        res.status(500).json({message: 'error getting actors details'})
    }
}