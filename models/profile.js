
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        unique: true
      },
      bio: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      },
      date: {
        type: Date,
        default: Date.now
      }
  });



// Define the user model
const User = mongoose.model("User", userSchema);

// export the user model
exports.User = User; 