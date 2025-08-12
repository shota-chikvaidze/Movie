const express = require('express')
const Movie = require('../models/movieModel')


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

        
        const totalMovies = await Movie.countDocuments(filter)
        const movies = await Movie.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 })
        

        
        res.status(200).json({
          message: 'movies received successfully',
          movies,
          page,
          totalPages: Math.ceil(totalMovies / limit),
          totalMovies,
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
    const { title, description, image, year, director, genre, videoPath, starring, rating, type, isFeatured } = req.body;

    try {
        if (
            !title ||
            !description ||
            !image ||
            !director ||
            !year ||
            !genre ||
            !videoPath ||
            !type ||
            !isFeatured ||
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

        const newMovie = new Movie({
            title,
            description,
            image,
            year,
            director,
            genre,
            videoPath,
            starring,
            rating,
            type,
            isFeatured
        });

        await newMovie.save();

        res.status(201).json({ message: 'movie created successfully', movie: newMovie });
    } catch (err) {
        res.status(500).json({ message: 'error creating movie', error: err.message });
    }
};


exports.getFeaturedMovies = async (req, res) => {
    try{

        const movies = await Movie.find({ isFeatured: 'true', 'type': 'Movie' }).sort({ createdAt: -1 }).limit(5)
        res.status(200).json({movies});

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