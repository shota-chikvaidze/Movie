const express = require('express')
const Episode = require('../models/episode')

exports.createEpisode = async (req, res) => {
    const { title, videoPath, series, } = req.body

    try{

        if( !title || !videoPath || !series ){
            return res.status(400).json({message: 'all fields required'})
        }

        const addEpisode = await Episode.create({
            title,
            videoPath,
            series,
        })

        res.status(201).json({message: 'episode created successfuly'})

    }catch(err){
        res.status(500).json({message: 'error creating new series', error: err.message})
    }
}

exports.episodeId = async (req, res) => {

    try{
        
        const getEpisodeById = await Episode.findById(req.params.id)

        if(!getEpisodeById){
            return res.status(400).json({message: 'episode not found'})
        }

        res.status(200).json({message: 'episode received successfuly', getEpisodeById})

    }catch(err){
        res.status(500).json({message: 'error getting episode', error: err.message})
    }

}

exports.getEpisodesBySeries = async (req, res) => {

    try{

        const episodes = await Episode.find({series: req.params.seriesId})
        
        res.status(200).json({mesage: 'episodes reveived successfuly', episodes})
    }catch(err){
        res.status(500).json({message: 'error getting episode by series'})
    }

}