const express = require('express')

const signup_data_to_mongodb = require('../models/user')
const bcrypt = require('bcryptjs')



const router = express.Router();

// schema hai mere pas from signup_data_to_mongodb ab mujhe post request bana kar bejna pade ga in hashed format due to security issue 

// here we goona use the async and await due to if we use await before function so kaam aage nahi bade ga jab tak wo kaam hoga and the async use where need to promise type of things or said jaha await ki jarurat redability ke liye async use ho jata hai

router.post('/signup', async(req,res)=> {

    const { name, email, password, phone } = req.body

    // check all field is field

    if(!name || !email || !password || !phone){
        res.status(400).json({error: 'all field is required'})
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10) // await ne ye kar diya ki jab tak hashed password wala kaam naho hoga tab tak aage nahi badna hai

        const user = signup_data_to_mongodb.create({name, email, password:hashedPassword, phone})

        console.log(user)

        res.status(201).json({message: 'user created successfully'})
    }

})


module.exports = router;