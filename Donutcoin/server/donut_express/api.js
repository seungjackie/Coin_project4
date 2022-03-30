var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const router = express.Router();
const dotenv = require("dotenv");
var http = require('http');
// const rpcMethods = require('./routes/api');
const mongoose = require('./mongoosecon');
const Blocks = require('./blocks');                                    //스키마창 가져오기, controller
dotenv.config();

// 몽고디비와 asnync로 불러와보기
const asyncHandler = require('express-async-handler')

// controller
const getBlocks = asyncHandler(async(req, res) => {
    const blocks = await Blocks.find({})
    res.json(blocks)                                                    //클라이언트 요청에 반응하는거다 ..
    console.log(blocks)
})


// getUserById function to retrieve user by id
 const getBlockById  = asyncHandler(async(req, res) => {
    const block = await Blocks.findById(req.params.height)

    //if user id match param id send user else throw error
    if(block){
        res.json(block)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})

// app.use('/explorer/id')


var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json({ extended: false }));
// app.use(express.urlencoded());

var request = require("request");
const srequest = require("sync-request");

const util = require('util');
var encoder = new util.TextEncoder('utf-8');

const USER = 'parkisak';
const PASS = 1234;
const PORT = 9776;
// const ACCOUNT = "parkisak";
const ID_STRING = "donutoin_id";
const headers = {
    "content-type": "text/pliain;"
};

// app.use("/", rpcMethods);

// mongoose
// var mongoose = require('mongoose');
const { json } = require('body-parser');
const User = require('../models/User');
// // mongoose는 sync 어떻게?
``


// const db = mongoose.connection;

// db.on('error', function(){
//     console.log('Connection Failed!');
// });

// db.once('open', function() {
//     console.log('Connected!');
// });

// // 몽구스 유저 스키마




// var bdataString = `{
//     "jsonrpc":"1.0", 
//     "id":"${ID_STRING}", 
//     "method":"getblockcount",
//     "params":[]
// }`;
// var options = {
//     headers: headers,
//     body: bdataString,

// };
// //기록된 요청을 디비로
// var bres = srequest('POST', `http://${USER}:${PASS}@127.0.0.1:${PORT}`, options);
// // console.log(bres)
// var blockcount = JSON.parse(bres.body.toString()).result;
// // console.log("blockcount = " + blockcount);

// for (let i = 0; i < blockcount + 1; i++) {
//     setTimeout(() => {
//         console.log(i + " round");
//         var dataString = `{
//             "jsonrpc":"1.0", 
//             "id":"${ID_STRING}", 
//             "method":"getblockhash",
//             "params":[${i}]
//         }`;
//         var options = {
//             headers: headers,
//             body: dataString
//         };

//         var res = srequest('POST', `http://${USER}:${PASS}@127.0.0.1:${PORT}`, options);
//         var hash = JSON.parse(res.body.toString()).result;
//         // console.log(hash);

//         var sdataString = `{
//             "jsonrpc":"1.0", 
//             "id":"${ID_STRING}", 
//             "method":"getblock",
//             "params":["${hash}"]
//         }`;
//         var soptions = {
//             headers: headers,
//             body: sdataString,
//         };

//         var res1 = srequest('POST', `http://${USER}:${PASS}@127.0.0.1:${PORT}`, soptions);
//         var data = JSON.parse(res1.body.toString()).result;
//         // let block = await Blocks.findOne({ hash });

//         // 스케마 짜기
//         // height를 idx로 사용 
//         // 테이블 항목 17
//         // height hash confirmation strippedsize size weight version versionhex merkleroot time(new Date로 변환) mediantime nonce bits difficulty chainwork previousblockhash nextblockhash
//         var newBlocks = new Blocks({
//             height: data.height,
//             hash: data.hash,
//             confirmation: data.confirmation,
//             strippedsize: data.strippedsize,
//             size: data.size,
//             weight: data.weight,
//             version: data.version,
//             versionhex: data.versionhex,
//             merkleroot: data.merkleroot,
//             time: data.time,
//             mediantime: data.mediantime,
//             nonce: data.nonce,
//             bits: data.bits,
//             difficulty: data.difficulty,
//             chainwork: data.chainwork,
//             previousblockhash: data.previousblockhash,
//             nextblockhash: data.nextblockhash
//         });
//         console.log(newBlocks.height);

//         Blocks.findOne({height : i}, function(error, block){
//             if (error) {
//                 console.log(error);
//             }
//             else if (!block){
//                 console.log(i + " loop & "+ newBlocks.height + " save");
//                 newBlocks.save(function (error, data) {  
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         console.log('Saved!');
//                     }
//                 }); 
//             }
//             else {
//                 // console.log("ac" + " " + block);
//                 console.log(block.height +" already exist block");
//             }
//         }); 
//     }, 100);
// };

module.exports = router;
