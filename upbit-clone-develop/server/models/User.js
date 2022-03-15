const mongoose = require('mongoose');

//스케마 생성
const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
    },
    name : {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required: true,
      },
});

module.exports = User = mongoose.model("user", UserSchema);