const mongoose = require('mongoose');

mongoose.createConnection('mongodb://13.124.19.24:27017/api', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("###### 데이터베이스 연결 성공 ######");
    }
});
