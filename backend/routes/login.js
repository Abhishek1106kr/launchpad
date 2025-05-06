const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()


const jwt = require('jsonwebtoken')

const data_from_mongodb_verify_for_login = require('../models/user')

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    if(!email, !password){
        return res.status(400).json({message: 'Fill all the places'})
    }

    try{
        const user = await data_from_mongodb_verify_for_login.findOne({email})

        if(!email){
            res.status(401).json({message: 'invalid credential'})
        }
            // chekc the pasword

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                res.status(401).json({message: 'invalid credential'})
            }


            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })

            return res.json({ token })
    }
    catch(err){
        console.log("the error be :->",err)
        res.status(500).json({ error: 'Server error' });
    }

})

module.exports = router;