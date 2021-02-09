const express = require('express')
const asyncHandler = require('express-async-handler')
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router()

// Getting the current user
router.get('/me', auth, async (req, res) => {
    // req.user._id comes from authentication
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
})

//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post( "/profile", async (req, res) => {
	const { address, location, bio } = req.body;
    
});

router.post('/', asyncHandler(async(req, res) => {
    
    const  { name, email, password } = req.body;

    let user = await User.findOne({ email })
    if(user){
        res.status(400)
        throw new Error('User Already exists')
    }

    user = new User({
        name,
        email,
        password,
        completed:false
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ["_id", "name", "email"]));
}))

module.exports = router
