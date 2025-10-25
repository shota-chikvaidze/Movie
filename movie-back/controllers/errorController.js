const express = require('express')
const Error = require('../models/error')

exports.postComment = async (req, res) => {
    const { name, lastname, email, comment } = req.body

    try{
        
        if(!name || !lastname || !email || !comment){
            return res.status(400).json({message: 'all fields required'})
        }

        const sendComment = await Error.create({
            name,
            lastname,
            email,
            comment
        })

        res.status(200).json({message: 'error comment sent successfuly', sendComment})

    }catch(err){
        res.status(500).json({message: 'error posting comment', error: err.message})
    }

}