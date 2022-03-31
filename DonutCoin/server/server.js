const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Blocks = require('./donut_express/blocks');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/process.env')});

const app = express();

// //몽구스 연결 성공여부 회신
mongoose.connect(process.env.mongoURI)
.then(() => console.log("###### 데이터베이스 연결 성공 ######"))
.catch((e) => console.log("###### MongoDB error: ######", e))
// const connectDB = require("./config/db");

// const db = mongoose.connect(process.env.mongoURI, (err) => {
//   console.log(process.env.mongoURI)
//     if(err){
//         console.log(err.message);
//     } else {
//         console.log('###### 데이터베이스 연결 성공 ######');
//     }
// });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const walletRoute = require('./routes/wallet');
// const boardRoute = require('./routes/board');
// const coinInfoRoute = require('./routes/coininfo');
// const commentRoute = require('./routes/comment');
// const likeRoute = require('./routes/like');
// const replyRoute = require('./routes/reply');

app.use('/api/user', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/wallet', walletRoute);
// app.use('/api/board', boardRoute);
// app.use('/api/coininfo', coinInfoRoute)
// app.use('/api/comment', commentRoute);
// app.use('/api/like', likeRoute);
// app.use('/api/reply', replyRoute);

app.get('/search',async(req,res) => {
  // app.get('/block',async(req,res) => {
      const blocks = await Blocks.find({})
      res.json(blocks)
      //클라이언트 요청에 반응하는거다 ..
      // sconsole.log(blocks)
  })
  

const port = 4000;
app.listen(port, () => {
  console.log(`${port}번으로 서버 실행 중입니다.`)
});