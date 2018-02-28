const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  name: {
    type: String, 
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  genre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  averageRating: {
    type: Number,
    required: true
  },
  numberOfRatings: {
    type: Number,
    default: 1
  }
})

mongoose.model('movies', movieSchema);

