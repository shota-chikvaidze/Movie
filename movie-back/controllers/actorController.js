const express = require('express')
const Actor = require('../models/actor')

exports.getActors = async (req, res) => {

    try{

        const getActors = await Actor.find()
        res.status(200).json({message: 'actor received successfuly', getActors})

    }catch(err){
        res.status(500).json({message: 'error getting actors'})
    }

}