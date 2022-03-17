const mongoose = require('mongoose');

//스케마 생성
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true,
        trim: true,    // space를 없애주는 역할
        unique: 1
    },
    name : {
        type: String,
        required : true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
      },
});

module.exports = User = mongoose.model("user", userSchema);