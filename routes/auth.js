const express = require('express');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', asyncHandler(async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(user)
  
}));


module.exports = router; 
