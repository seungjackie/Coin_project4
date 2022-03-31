const mongoose = require('mongoose');


// mongoose.createConnection('mongodb://13.124.19.24:27017/api', (err) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log("###### 데이터베이스 연결 성공 ######");
//     }
// });m
// ./donutcoind -conf=/home/ 


const BlockSchema = new mongoose.Schema({
    height: 'Number',
    hash: 'String',
    confirmation: 'Number',
    strippedsize: 'Number',
    size: 'Number',
    weight: 'Number',
    version: 'Number',
    versionhex: 'Number',
    merkleroot: 'String',
    time: 'Number',
    mediantime: 'Number',
    nonce: 'Number',
    bits: 'String',
    difficulty: 'Number',
    chainwork: 'Number',
    previousblockhash: 'String',
    nextblockhash: 'String'
});

//db 스키마 연결?
//스키마는 모델 창에 넣어야함
module.exports = mongoose.model('testblocks', BlockSchema);
