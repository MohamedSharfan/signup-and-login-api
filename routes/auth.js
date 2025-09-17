const express = require('express');
const User = require('../models/User');
const config = require('../config');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const router = express.Router();


 router.post('/signup', 
    body('name').isLength({ min:2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password } = req.body;

            let user = await User.findOne({ email });
            if(user) return res.status(409).json({ message: "Email already in use" });
            
            user = new User({ name, email, password });
            await user.save();

            const payload = { userId:user._id, role:user.role };
            const token = jwt.sign(payload, config.jwtSecret, { expiresIn:config.jwtExpiresIn })
            
        } catch (e) {
            console.error(e);
            res.status(500).json({ messege:"Server error" });
        }
    }
)