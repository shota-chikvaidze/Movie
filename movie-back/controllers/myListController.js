const express = require('express')
const User = require('../models/userModel')
const Movie = require('../models/movieModel')

exports.movieList = async (req, res) => {
    const userId = req.user.id
    const movieId = req.body.movieId;

    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        
        const index = user.myList.indexOf(movieId)
        
        if(index > -1){
            user.myList.splice(index, 1)
            await user.save()
            res.status(200).json({message: 'movie removied from the list', action: 'removed'})
        }else{
            user.myList.push(movieId)
            await user.save()
            res.status(200).json({message: 'movie added to list', action: 'added'})
        }
        
    }catch(err){
        res.status(500).json({message: 'error listing movie', error: err.message})
    }
    
}

exports.getMyList = async (req, res) => {
    try{
        
        const user = await User.findById(req.user.id).populate('myList')
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        
        res.status(200).json(user.myList)
        
    }catch(err){
        res.status(500).json({message: 'error getting list', error: err.message})
    }
}

exports.deleteList = async (req, res) => {
    try{
        
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'movie deleted sucessfuly', deleteMovie})

    }catch(err){
        res.status(500).json({message: 'error deleting movie'})
    }
}