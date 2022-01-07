const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Profile = require('../models/ProfileModel');
const Follower = require('../models/FollowerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const userPng = "../img/default_user.png";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get('/:username', async (req, res) => {
    const username = req.params;

    try {
        if (username.length < 1) {
            res.status(401).send(`Invalid username`);
        }

        if (!regexUserName.test(username)) {
            res.status(401).send(`Invalid username`);
        }

        const user = await UserManager.findOne({ username: username.toLowerCase() });

        if (user) {
            res.status(401).send(`Username already in use`);
        }

        return res.status(200).send(`Available`);
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Server error`);
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        email,
        username,
        password,
        bio,
        facebook,
        github,
        twitter,
    } = req.body.user;

    if (!isEmail(email)) {
        res.status(401).send(`Invalid email`);
    }
    
    if (password.length < 6) {
        res.status(401).send(`Password must be at least 6 characters`);
    }

    try {
        let user;
        user = await UserModel.findOne({ email: email.toLowerCase() });

        if (user) {
            res.status(401).send(`Email already in use`);
        }

        user = new UserModel({
            name,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: password.toLowerCase(),
            profilePicUrl: req.body.profilePicUrl || userPng
        });

        user.password = await bcrypt.hash(password, 10);
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Server error`);
    }
});

module.exports = router;