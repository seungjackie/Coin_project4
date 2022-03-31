const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// 회원정보
const userSchema = mongoose.Schema({
  email: { type: String, trim: true, unique: true, minlength: 6, required: true },
  password: { type: String, minlength: 8, required: true },
  name: { type: String, minlength: 2, required: true },
  // github: { type: String, required: true },
  // gender: { type: String, required: true },
  // field: { type: String },
  // userDescription: { type: String, maxlength: 100 },
  date: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss')},
  token: { type: String },
  walletaddress: { type: String },
});














