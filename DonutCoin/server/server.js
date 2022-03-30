// //기본 서버 연결
// const express = require('express');
// const app = express();
// const PORT = 4000;
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');


// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.json({ extended: false })); //req의 body정보를 읽도록 설정함
// app.use("/api/users", require("./routes/api/join")); //라우터 연결

// const usersRoute = require('./routes/users');
// const authRoute = require('./routes/auth');
// app.use('/api/user', usersRoute);
// app.use('/api/auth', authRoute);

// //프록시 서버 설정
// const proxy = require('http-proxy-middleware');
// module.exports = function(app) {
//     app.use(
//         '/api',
//         proxy({
//             target: 'http://localhost:4000',
//             changeOrigin: true
//         })
//     );
// };

// //몽구스 연결
// const mongoose = require('mongoose');
// const connectDB = require("./config/db");
// const uri = 'mongodb://13.124.19.24:27017/userinfo';


// //몽구스 연결 성공여부 회신
// const db = mongoose.connect(uri, (err) => {
//     if(err){
//         console.log(err.message);
//     } else {
//         console.log('###### 데이터베이스 연결 성공 ######');
//     }
// });

// // //몽구스 유저 스키마
// // const UserSchema = new mongoose.Schema({
// //     password : String, // 비밀번호
// //     name : String, //이름
// //     email : String, //아이디
// // });
// // const Users = mongoose.model('users', UserSchema);

// app.get('/', (req, res) => {
//     // res.header("Access-Control-Allow-Origin", "*");
//     res.send('Welcome!');
// });

// // app.post('/api/users/join', (req, res) => {
// //     console.log("req.body : " + req.body.Email);
// //     var new_user = new Users(req.body);
// //     new_user.save((err) => {
// //         if(err) return res.status(500).json({message : '저장실패'})
// //         else return res.status(200).json({message : '저장성공', data : new_user});
// //     });
// // });

// // app.post('/join', (req, res) => {
// //     var new_user = new Users(req.body);
// //     new_user.save((err) => {
// //         if(err) return res.status(500).json({message : '저장실패'})
// //         else return res.status(200).json({message : '저장성공', data : new_user});
// //     });
// // });

// // app.post('/api/users/login', (req, res) => {
// //     Users.findOne({ id : req.body.id, password : req.body.password }, (err, user) => {
// //         if(err) return res.status(500).json({message : '에러'})
// //         else if (user) return res.status(200).json({message : '유저확인', data : new_user});
// //         else return res.status(404).json({message : '유저 없음'});
// //     });
// // });

// app.post('/login', (req, res) => {
//     Users.findOne({ id : req.body.id, password : req.body.password }, (err, user) => {
//         if(err) return res.status(500).json({message : '에러'})
//         else if (user) return res.status(200).json({message : '유저확인', data : new_user});
//         else return res.status(404).json({message : '유저 없음'});
//     });
// });



// app.listen(PORT, () => console.log(`###### ${PORT} 포트 실행 중 ######`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/process.env')});

const app = express();
// //프록시 서버 설정
// const proxy = require('http-proxy-middleware');
// module.exports = function(app) {
//     app.use(
//         '/api',
//         proxy({
//             target: 'http://localhost:4000',
//             changeOrigin: true
//         })
//     );
// };

// mongoose.connect(process.env.mongoURI)
// .then(() => console.log("몽고 디비와 연결되었습니다."))
// .catch((e) => console.log("MongoDB error: ", e))

// //몽구스 연결 성공여부 회신
const connectDB = require("./config/db");

const db = mongoose.connect(process.env.mongoURI, (err) => {
  console.log(process.env.mongoURI)
    if(err){
        console.log(err.message);
    } else {
        console.log('###### 데이터베이스 연결 성공 ######');
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
// const boardRoute = require('./routes/board');
// const coinInfoRoute = require('./routes/coininfo');
// const commentRoute = require('./routes/comment');
// const likeRoute = require('./routes/like');
// const replyRoute = require('./routes/reply');

app.use('/api/user', usersRoute);
app.use('/api/auth', authRoute);
// app.use('/api/board', boardRoute);
// app.use('/api/coininfo', coinInfoRoute)
// app.use('/api/comment', commentRoute);
// app.use('/api/like', likeRoute);
// app.use('/api/reply', replyRoute);


const port = 4000;
app.listen(port, () => {
  console.log(`${port}번으로 서버 실행 중입니다.`)
});