const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    const { name, lastname, password, email } = req.body

    if( !name || !lastname || !password || !email ){
        return res.status(400).json({message: 'all fields required'})
    }
    
    const findUser = await User.findOne({email})
    if(findUser) {
        return res.status(400).json({message: "user already exists"})
    }

    try{

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name, 
            lastname,
            password: hashedPassword,
            email
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
            expiresIn: '2d'
        });

        res.status(201).json({message: 'user created successfuly', newUser, token })

    }catch(err){
        res.status(500).json({message: 'error creating user', error: err.message})
    }

}

exports.login = async (req, res) => {

    const { email, password } = req.body
    
    try{

        const checkUser = await User.findOne({email})
        if(!checkUser){
            return res.status(400).json({message: 'user not found'})
        }


        const matchPassword = await bcrypt.compare(password, checkUser.password)
        if(!matchPassword){
            return res.status(400).json({message: "invalid password"})
        }


        const token = jwt.sign({ id: checkUser._id }, process.env.JWT, {
            expiresIn: '2d'
        })

        res.status(200).json({message: "user logged in successfuly", token})
        
    }catch(err){
        res.status(500).json({message: "login error", error: err.message} )
    }

    
}

exports.getUser = async (req, res) => {
    try{

        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(400).json({message: 'no token'})
        }

        const decoded = jwt.verify(token, 'SECRETTOKEN')
        const getUser = await User.findById(decoded.id)

        res.status(200).json({message: 'user received successfuly', getUser})

    }catch{
        res.status(500).json({message: 'error fetching users'})
    }
}