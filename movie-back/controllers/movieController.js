const express = require('express')
const Movie = require('../models/movieModel')
const Series = require('../models/seriesModel')


exports.getAllMovies = async (req, res) => {

    try{

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit

        const search = req.query.search || ''
        const genre = req.query.genre
        const year = req.query.year
        const rating = req.query.rating
        

        const filter = {}

        if(search){
            filter.title = { $regex: search, $options: 'i' }
        }

        if (genre) {
            filter.genre = { $regex: new RegExp(genre, 'i') }
        }

        if(year){
            filter.year = { $gte: parseInt(year) }
        }

        if (rating) {
            filter['rating.0.score'] = { $gte: Number(rating) }
        }

        
        const movies = await Movie.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 })
        const totalMovies = await Movie.countDocuments(filter)
        

        
        res.status(200).json({
          message: 'movies received successfully',
          movies,
          totalMovies,
          page,
          totalPages: Math.ceil(totalMovies / limit),
        })

    }catch(err){
        res.status(500).json({message: 'could not get movies', error: err.message})
    }
}

exports.getMoviesId = async (req, res) => {
    try{

        const getMoviesById = await Movie.findById(req.params.id)
        if(!getMoviesById){
            return res.status(404).json({message: 'movie not found'})
        }
        res.status(200).json({message: 'movies by id recieved seccessfuly', getMoviesById})

    }catch(err){
        res.status(500).json({message: 'could not get movied by id'})
    }
}

exports.createMovies = async (req, res) => {
    const movies = req.body;

    try {
        if (!Array.isArray(movies) || movies.length === 0) {
            return res.status(400).json({ message: 'Movies array is required' });
        }

        for (const movie of movies) {
            const {
                title, description, image, year,
                director, genre, videoPath,
                starring, rating, type, isFeatured
            } = movie;

            if (
                !title || !description || !image || !director ||
                !year || !genre || !videoPath || !type ||
                typeof isFeatured !== 'boolean' ||
                !Array.isArray(starring) || starring.length === 0 ||
                !Array.isArray(rating) || rating.length === 0
            ) {
                return res.status(400).json({ message: `Invalid movie: ${title || 'unknown'}` });
            }

            for (const actor of starring) {
                if (!actor.actor || !actor.role) {
                    return res.status(400).json({ message: `Invalid starring in ${title}` });
                }
            }

            for (const r of rating) {
                if (!r.source || !r.score || !r.date) {
                    return res.status(400).json({ message: `Invalid rating in ${title}` });
                }
            }
        }

        const createdMovies = await Movie.insertMany(movies);

        res.status(201).json({
            message: 'Movies created successfully',
            movies: createdMovies
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error creating movies',
            error: err.message
        });
    }
};


exports.getFeaturedMovies = async (req, res) => {
    try{

        const featuredMovies = await Movie.find({ isFeatured: 'true', 'type': 'Movie' })
            .sort({ createdAt: -1 })
            .limit(5) 

        const featuredSeries = await Series.find({ isFeatured: true, type: 'TV Series' })
            .sort({ createdAt: -1 })
            .limit(5)

        
        const allFeatured = [...featuredMovies, ...featuredSeries]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 

            
        res.status(200).json({ content: allFeatured})

    }catch(err){
        res.status(500).json({ message: 'Error fetching homepage movies' });
    }
};

exports.getNewReleasedMovies = async (req, res) => {
    try{

        const newRealesed = await Movie.find({ type: 'Movie' }).sort({ createdAt: -1 }).limit(18)
        res.status(200).json({newRealesed}) 

    }catch(err){
        res.status(500).json({message: 'error fetching new relesed movies', error: err.message})
    }
}