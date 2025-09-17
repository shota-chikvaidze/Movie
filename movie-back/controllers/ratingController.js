const express = require('express')
const Rating = require('../models/rating')

exports.rate = async (req, res) => {
    const { rating } = req.body
    const userId = req.user.id
    const movieId = req.params.movieId


    if(rating < 1 || rating > 5){
        return res.status(400).json({message: 'rating must be between these numbers'})
    }

    try{

        const exists = await Rating.findOne({userId, movieId})

        if(exists){
            exists.rating = rating
            await exists.save()
            res.status(200).json({message: 'rating changed sucessfully', rating: exists})
        }else{
            const newRating = new Rating({ rating, userId, movieId })
            await newRating.save()
            res.status(201).json({message: 'rating submited', rating: newRating})    
        }

    }catch(err){
        res.status(500).json({message: 'error rating', error: err.message})
    }

}

exports.ratingSummary = async (req, res) => {
    try{

        const { movieId } = req.query

        const ratings = await Rating.find({ movieId })

        const totalRating = ratings.length
        const averageRating =
            totalRating === 0
              ? 0
              : ratings.reduce((sum, r) => sum + r.rating, 0) / totalRating

        res.status(200).json({
            totalRating,
            averageRating: averageRating.toFixed(1),
        });

    }catch(err){
        res.status(500).json({message: 'error fetching summary rating', error: err.message})
    }
}

exports.getUserRating = async (req, res) => {
    
    const userId = req.params.userId
    
    try{

        const getUserRating = await Rating.find({ userId: userId })
        .populate('movieId', 'title')
        .sort({ postedAt: -1 })

        res.status(200).json({message: 'user ratings received successfuly', ratings: getUserRating   })

    }catch(err){
        res.status(500).json({message: 'error getting ratings', error: err.message})
    }
}

exports.deleteUserRating = async (req, res) => {
    try{

        const userId = req.params.id
        const deleteRating = await Rating.findByIdAndDelete(userId)
        res.status(200).json({message: 'rating deleted successfuly'})

    }catch(err){
        res.status(500).json({message: 'error deleteing rating'})
    }
}
