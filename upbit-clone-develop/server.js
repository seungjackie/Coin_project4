const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

const app = express();

const uri = 'mongodb://13.124.19.24:27017/userinfo';

//연결 성공여부 회신
const db = mongoose.connect(uri, (err) => {
    if(err){
        console.log(err.message);
    } else {
        console.log('###### 데이터베이스 연결 성공 ######');
    }
});

//유저 스키마
const UserSchema = new mongoose.Schema({
    password : String, // 비밀번호
    name : String, //이름
    id : String, //아이디
});

const Users = mongoose.model('users', UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: 'lgb', extended : false }));

app.get('/', (req, res) => {
    res.send('Welcome to api page!');
});

app.post('/join', (req, res) => {
    var new_user = new Users(req.body);

    new_user.save((err) => {
        if(err) return res.status(500).json({message : '저장실패'})
        else return res.status(200).json({message : '저장성공', data : new_user});
    });
});

app.post('./login', (req, res) => {
    Users.findOne({ id : req.body.id, password : req.body.password }, (err, user) => {
        if(err) return res.status(500).json({message : '에러'})
        else if (user) return res.status(200).json({message : '유저확인', data : new_user});
        else return res.status(404).json({message : '유저 없음'});
    });
});

app.listen(PORT, () => console.log(`###### ${PORT} 포트 실행 중 ######`));