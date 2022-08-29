const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: Date,
}, {timestamps: true});

const Pers = mongoose.model('Pers', schema);
module.exports = Pers;
