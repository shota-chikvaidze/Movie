const express = require('express')
const Series = require('../models/seriesModel')

exports.getAllSeries = async (req, res) => {
    try{

        const search = req.query.search || ''

        const filter = {}

        if(search){
            filter.title = { $regex: search, $options: 'i' }
        }

        const getAllSeries = await Series.find(filter)
        res.status(200).json({message: 'series received successfuly', series: getAllSeries})

    }catch(err){
        res.status(500).json({message: 'error getting all series'})
    }
}

exports.getSeriesId = async (req, res) => {
    try{

        const seriesById = await Series.findById(req.body.id)
        if(!seriesById){
            return res.status(404).json({message: 'series not found'})
        }
        res.status(200).json({message: 'series received successfuly', series: seriesById })

    }catch(err){
        
    }
}

exports.createSeries = async (req, res) => {
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ message: 'Array of series required' });
        }

        const newSeriesList = await Series.insertMany(req.body);
        res.status(201).json({ message: 'Series created successfully', series: newSeriesList });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating series', error: err.message });
    }
};


exports.getNewReleasedSeries = async (req, res) => {
    try{

        const newRealesedSeries = await Series.find({ type: 'TV Series' }).sort({ createdAt: -1 }).limit(18)
        res.status(200).json({newRealesedSeries}) 

    }catch(err){
        res.status(500).json({message: 'error fetching new relesed series', error: err.message})
    }
}