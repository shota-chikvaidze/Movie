const express = require('express')
const Comment = require('../models/comment')
const Movie = require('../models/movieModel')

exports.postComment = async (req, res) => {
    const { text, movieId } = req.body
    const userId = req.user.id

    try{
        const movie = await Movie.findById(movieId)
        if(!movie){
            return res.status(404).json({message: 'movie not found'})
        }

        if(!text || text.length === 0){
            return res.status(400).json({message: 'comment text is required'})
        }

        const newComment = await Comment.create({
            text,
            movie: movieId,
            user: userId,
        })

        res.status(201).json({newComment})

    }catch(err){
        res.status(500).json({message: 'error posting comment', error: err.message})
    }
}

exports.getComments = async (req, res) => {
    const { movieId } = req.query

    try{

        const comments = await Comment.find({ movie: movieId }).populate('user', 'name lastname').sort({ postedAt: -1 })
        res.status(200).json({comments})

    }catch(err){
        res.status(500).json({message: 'error getting comments', error: err.message})
    }
}

exports.getUserComments = async (req, res) => {
    const userId = req.params.userId

    try{

        const userComments = await Comment.find({ user: userId })
        .populate('movie', 'title')
        .sort({ postedAt: -1 })

        res.status(200).json({userComments})

    }catch(err){
        res.status(500).json({message: 'error getting user comments', error: err.message})
    }

}

exports.deleteComments = async (req, res) => {
    try{

        const deleteComment = await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'comment deleted successfuly', deleteComment})

    }catch(err){
        res.status(500).json({message: 'error deleting comment', error: err.message})
    }
}

exports.editComment = async (req, res) => {
    try{
        
        

    }catch(err){
        res.status(500).json({message: 'error editing comment', error: err.message})
    }
}