// const mongoose = require('mongoose');

// //스케마 생성
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required : true,
//         trim: true,    // space를 없애주는 역할
//         unique: 1
//     },
//     name : {
//         type: String,
//         required : true,
//         maxlength: 50
//     },
//     password: {
//         type: String,
//         required: true,
//       },
// });

// module.exports = mongoose.model("User", userSchema);

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
  token: { type: String }
});


userSchema.pre('save', function (next) {
  var user = this;
  if(user.isModified('password')) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
          if(err) return next(err);
          bcrypt.hash(user.password, salt, function (err, hash) {
              if(err) return next(err);
              user.password = hash;
              next();
          })
      })
  }else {
      next();
  }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if(err) return callback(err);
      callback(null, isMatch);
  })
}

userSchema.methods.generateToken = function (callback) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET);
  user.token = token;
  user.save(function (err, user) {
      if(err) return callback(err);
      callback(null, user);
  })
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    user.findOne({"_id": decoded, "token": token}, function (err, user) {
      if(err) return cb(err)
      cb(null, user)
    })
  })
}


const User = mongoose.model('User', userSchema);
module.exports = { User };