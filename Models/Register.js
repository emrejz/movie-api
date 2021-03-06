const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Register = new Schema({
  username: {
    type: String,
    required: [true, "`{PATH}` alanı boş olamaz"],
    unique: [true, "`{PATH}` alanı benzersiz olmalı"],
    maxlength: [15, "`{PATH}` alanı max 12 karakter olabilir"],
    minlength: [3, "`{PATH}` alanı min 2 karakter olabilir"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "`{PATH}` alanı boş olamaz"],
    minlength: [3, "`{PATH}` alanı min 5 karakter olabilir"],
    trim: true
  }
});

module.exports = mongoose.model("register", Register);
