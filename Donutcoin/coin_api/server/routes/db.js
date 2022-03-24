var express = require('express');
const bodyParser = require('body-parser');
const rpcMethods = require('./api');
var cors = require('cors')

var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var request = require("request");
var srequest = require("sync-request");

const dotenv = require("dotenv");
dotenv.config();

var util= require('util');
var encoder = new util.TextEncoder('utf-8');

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT = 9776;
const ACCOUNT = "parkisak";
const ID_STRING = "donutoin_id";
const headers = {
    "content-type": "text/pliain;"
};

app.use("/", rpcMethods);

// mongoose
var mongoose = require('mongoose');
// mongoose는 sync 어떻게?

mongoose.connect('mongodb://13.124.19.24:27017/api', (err) => {
    if(err){
        console.log(err.message);
    } else {
        console.log("###### 데이터베이스 연결 성공 ######");
    }
});

// const db = mongoose.connection;

// db.on('error', function(){
//     console.log('Connection Failed!');
// });

// db.once('open', function() {
//     console.log('Connected!');
// });

//몽구스 유저 스키마
// const BlockSchema = new mongoose.Schema({
//     height : Number ,
//     hash : String ,
//     confirmation : Number ,
//     strippedsize : Number ,
//     size : Number ,
//     weight : Number , 
//     version : Number ,
//     versionhex : Number ,
//     merkleroot : String ,
//     time : Number ,
//     mediantime : Number ,
//     nonce : Number ,
//     bits : Number ,
//     difficulty : Number ,
//     chainwork : Number ,
//     previousblockhash : String ,
//     nextblockhash : String 
// });
// const Blocks = mongoose.model('blocks', BlockSchema);


// for (let i = 0 ; i < blockcount; i++) {
//     var dataString = `{
//                 "jsonrpc":"1.0", 
//                 "id":"${ID_STRING}", 
//                 "method":"getblockhash",
//                 "params":[${i}]
//                 }`;
//     var options = {
//         headers: headers,
//         body: dataString,
//     };
    
//     var res = srequest('POST', `http://${USER}:${PASS}@127.0.0.1:${PORT}`, options);
//     var hash = JSON.parse(res.body.toString()).result;
//     // console.log(hash);

//     var sdataString = `{
//                     "jsonrpc":"1.0", 
//                     "id":"${ID_STRING}", 
//                     "method":"getblock",
//                     "params":["${hash}"]
//                     }`;

//     var soptions = {
//         headers: headers,
//         body: sdataString,
//     }

//     var res1 = srequest('POST', `http://${USER}:${PASS}@127.0.0.1:${PORT}`, soptions);
//     var data = JSON.parse(res1.body.toString()).result;

//     // 스케마 짜기
//     // height를 idx로 사용 
//     // 테이블 항목 17
//     // height hash confirmation strippedsize size weight version versionhex merkleroot time(new Date로 변환) mediantime nonce bits difficulty chainwork previousblockhash nextblockhash
//     var newBlocks = new Blocks({ 
//         height : data.height ,
//         hash : data.hash ,
//         confirmation : data.confirmation ,
//         strippedsize : data.strippedsize ,
//         size : data.size ,
//         weight : data.weight , 
//         version : data.version ,
//         versionhex : data.versionhex ,
//         merkleroot: data.merkleroot ,
//         time : data.time ,
//         mediantime : data.mediantime ,
//         nonce : data.nonce ,
//         bits : data.bits ,
//         difficulty : data.difficulty ,
//         chainwork : data.chainwork ,
//         previousblockhash : data.previousblockhash ,
//         nextblockhash : data.nextblockhash 
//     });

//     newBlocks.save(function(error, data){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Saved!')
//         }
//     });
// };

app.listen(4000, function() {
    console.log("donutcoin API Tutorial is running apt http://localhost:4000/");
});
