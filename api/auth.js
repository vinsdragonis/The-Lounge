const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Follower = require('../models/FollowerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

router.post('/', async (req, res) => {
    const { email, password } = req.body.user;

    if (!isEmail(email)) {
        res.status(401).send(`Invalid email`);
    }
    
    if (password.length < 6) {
        res.status(401).send(`Password must be at least 6 characters`);
    }

    try {
        const user = await UserModel.findOne({ email: email.toLowerCase() }).select("+password");

        if (!user) {
            res.status(401).send(`Invalid credentials`);
        }
        
        const password = await bcrypt.compare(password, user.password);
        
        if (!password) {
            res.status(401).send(`Invalid credentials`);
        }

        const payload = { userId: user._id };
        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: "2d" },
            (err,token) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(token);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Server error`);
    }
});

module.exports = router;