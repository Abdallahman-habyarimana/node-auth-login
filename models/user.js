const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      },
      completed: {
        type:Boolean
      }
  });

// function to generate the token
// Information expert principle
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    completed: this.completed
  },
  config.get("jwtPrivateKey")
  )
  return token;
}


// Define the user model
const User = mongoose.model("User", userSchema);


// this function is for the validation
// validate name, email, password
// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required(),
//     password: Joi.string().min(5).max(1024).required,
//     completed: Joi.boolean()
//   };
//   return Joi.validate(user, schema);
// }

// export the user model
exports.User = User; 