const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs'); // 암호화 모듈


// router.post('/api/users/join', (req, res) => {
//     var new_user = new Users(req.body);
//     new_user.save((err, info) => {
//         if(err) return res.status(500).json({success : false, message : '저장실패'})
//         else return res.status(200).json({success : true, message : '저장성공', data : new_user});
//     });
// });

router.post("/join", async (req, res) => {
        const { email, name, password } = req.body;
        console.log("email : " + email);
        
        try {
            // email을 비교하여 user가 이미 존재하는지 확인
            let user = await User.findOne({ email });
            //이미 사용중인 이메일일때
            if(user) {
                console.log('id중복');
                return res
                .status(400)
                .json({ errors: [{ msg : "##### 이미 사용중인 이메일입니다 #####"}] });
            } 
            console.log("회원가입 완료")

            // 사용 가능한 이메일일때
            // user에 name, email, password 값 할당
            user = new User({
                email,
                name,
                password,
            });

            //password 암호화 하기
            const salt = await bcrypt.genSalt(10);
            user.password  = await bcrypt.hash(password, salt);

            await user.save(); // db에 user 저장
            
            res.send("##### 회원가입이 완료되었습니다 #####")
            
        }
         catch (error) {
            console.error(error.message);
            res.status(500).send("##### ERROR : 서버를 확인하세요 #####")
        }

    }
)

module.exports = router;