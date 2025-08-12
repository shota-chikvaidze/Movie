const express = require('express')
const Series = require('../models/seriesModel')

exports.getAllSeries = async (req, res) => {
    try{

        const getAllSeries = await Series.find()
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

exports.newSeries = async (req, res) => {
    const { title, description, image, year, director, genre, starring: [ {actor, role} ], rating: [ {source, score, date} ] } = req.body
    

    try{

        if (
            !title ||
            !description ||
            !image ||
            !director ||
            !year ||
            !genre ||
            !Array.isArray(starring) || starring.length === 0 ||
            !starring[0].actor ||
            !starring[0].role ||
            !Array.isArray(rating) || rating.length === 0 ||
            !rating[0].source ||
            !rating[0].score ||
            !rating[0].date
        ) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const newSeries = new Series({
            title,
            description,
            image,
            year,
            director,
            genre,
            starring: [ { actor, role } ],
            rating: [ { source, score, date } ]
        })
        await newSeries.save()

        res.status(201).json({message: 'successfuly created series', series: newSeries})



    }catch(err){
        res.status(500).json({message: 'error creating series'})
    }

}