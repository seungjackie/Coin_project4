// import React, { useState } from "react";
// import styled from "styled-components";
// import { useDispatch } from 'react-redux';
// import { withRouter } from 'react-router-dom'
// import { joinUser } from '../../Reducer/action/user_action';


// const St = {
//     Container: styled.div`
//     width: 100vw;
//     height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: rgb(231, 234, 239);
//   `,
//     Login: styled.form`
//     width: 30%;
//     height: 600px;
//     background: white;
//     border-radius: 20px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//   `,
//     Head: styled.div`
//     margin-bottom: 1rem;
//     color: white;
//     font-size: 3em;
//     font-weight: bolder;
//     text-shadow: 1px 2px 3px black;
//   `,
//     Login_sns: styled.div`
//     padding: 20px;
//     display: flex;
//   `,
//     Login_id: styled.div`
//     margin-top: 20px;
//     width: 80%;
//   `,
//     Input: styled.input`
//     width: 100%;
//     height: 50px;
//     border-radius: 30px;
//     margin-top: 10px;
//     padding: 0px 20px;
//     border: 1px solid lightgray;
//     outline: none;
//   `,
//     Login_pw: styled.div`
//     margin-top: 20px;
//     width: 80%;
//   `,
//     Join_name: styled.div`
//     margin-top: 20px;
//     width: 80%;
// `,
//     Submit: styled.div`
//     margin-top: 50px;
//     width: 80%;
//    `,
//     Submit_button: styled.button`
//     width: 100%;
//     height: 50px;
//     border: 0;
//     outline: none;
//     border-radius: 40px;
//     background: linear-gradient(to right, rgb(231, 234, 239), #f7b5c9);
//     color: white;
//     font-size: 1.2em;
//     letter-spacing: 2px;
//     cursor:pointer;
//     &:hover {
//         background: linear-gradient(to right, #f7b5c9, #f7b5c9);
//         color: white;
//     }
//     `,
//     ToJoin: styled.a`
//     margin: auto;
//     text-decoration-line: none;
//     text-decoration-line: none;
//     `,

// };

// const JoinForm = (props) => {
//   // redux의 dispatch

//   const [state, setState] = useState(true);
//   const [inputs, setInputs] = useState({
//     email : "",
//     name : "",
//     password : "",
//     passwordconfirm : ""
//   });

//   const {email, name, password, passwordconfirm} = inputs;

//   const onChange = (e) => {
//     const { name, value } = e.target;

//     setInputs({
//       ...inputs,
//       [name] : value
//     })
//   }

//     //비밀번호 유효성 검사
//   const checkPassword = (value) => {
//     var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/ 
//     //  8 ~ 10자 영문, 숫자 조합
//     // 형식에 맞는 경우 true 리턴
//     if(!regExp.test(value)){
//       alert("비밀번호를 재설정하세요")
//       return true
//     }
//     // console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
//   }
//   // 이메일 유효성 검사
//   const checkEmail = (value) => {
//       var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
//       // 형식에 맞는 경우 true 리턴
//       if(!regExp.test(value)){
//         alert("이메일 형식으로 입력하세요")
//         return true
//       }
//       // console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
//   }


//   const onSubmit = () => {
//     if (checkEmail(inputs.email) || checkPassword(inputs.password)) return;
//     else if (inputs.passwordconfirm=="") alert("비밀번호를 재입력하세요");
//     else {
//       const post ={
//         pemail : inputs.email,
//         pname: inputs.name,
//         ppassword: inputs.password,
//         ppasswordconfirm : inputs.passwordconfirm
//       };

//       console.log(post);

//       fetch("http://localhost:3000/join", {
//         method : "post",
//         headers : {
//           "content-type" : "application/json"
//         },
//         body : JSON.stringify(post)
//       })
//       .then((res)=> res.json())
//       .then((json)=>{
//         console.log(json);
//         if (json) {
//           alert("회원 가입 성공!")
//           setState(!state);
//         }
//         else alert("중복된 아이디입니다")
//       })
//     }
//   }

//   if (state) {
//     // 이메일 유효성 검사
//     const checkEmail = (e) => {
//       var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
//       // 형식에 맞는 경우 true 리턴
//       if(!regExp.test(e.target.value)){
//         alert("이메일 형식으로 입력하세요")
//       }
//     }
//     //비밀번호 유효성 검사
//     const checkPassword = (e) => {
//       var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/ 
//       //  8 ~ 10자 영문, 숫자 조합
//       // 형식에 맞는 경우 true 리턴
//       if(!regExp.test(e.target.value)){
//         alert("비밀번호를 재설정하세요")
//       }
//    }
//   }

//   return (
//     <St.Container action='post'>
//         <St.Login onSubmit={onSubmit} >
//             <St.Head>WELCOME</St.Head>
//             <St.Login_id>
//                 <h4>E-mail</h4>
//                 <St.Input type="email" value={email} onChange={onChange} name="" id="" placeholder="Email" />
//             </St.Login_id>
//             <St.Join_name>
//                 <h4>Name</h4>
//                 <St.Input type="text" value={name} onChange={onChange} name="" id="" placeholder="Name" />
//             </St.Join_name>
//             <St.Login_pw>
//                 <h4>Password</h4>
//                 <St.Input type="password" value={password} onChange={onChange} name="" id="" placeholder="Password" />
//             </St.Login_pw>
//             <St.Login_pw>
//                 <h4>Password Confirm</h4>
//                 <St.Input type="password" value={passwordconfirm} onChange={onChange} name="" id="" placeholder="Password Confirm" />
//             </St.Login_pw>
//             <St.Submit>
//                 <St.Submit_button type="submit">JOIN</St.Submit_button>
//             </St.Submit>
//         </St.Login>
//     </St.Container>
//   )
// }

// export default withRouter(JoinForm);


import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { joinUser } from '../../Reducer/action/user_action';


const St = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(231, 234, 239);
  `,
  Login: styled.form`
    width: 30%;
    height: 600px;
    background: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  Head: styled.div`
    margin-bottom: 1rem;
    color: white;
    font-size: 3em;
    font-weight: bolder;
    text-shadow: 1px 2px 3px black;
  `,
  Login_sns: styled.div`
    padding: 20px;
    display: flex;
  `,
  Login_id: styled.div`
    margin-top: 20px;
    width: 80%;
  `,
  Input: styled.input`
    width: 100%;
    height: 50px;
    border-radius: 30px;
    margin-top: 10px;
    padding: 0px 20px;
    border: 1px solid lightgray;
    outline: none;
  `,
  Login_pw: styled.div`
    margin-top: 20px;
    width: 80%;
  `,
  Join_name: styled.div`
    margin-top: 20px;
    width: 80%;
`,
  Submit: styled.div`
    margin-top: 50px;
    width: 80%;
   `,
  Submit_button: styled.button`
    width: 100%;
    height: 50px;
    border: 0;
    outline: none;
    border-radius: 40px;
    background: linear-gradient(to right, rgb(231, 234, 239), #f7b5c9);
    color: white;
    font-size: 1.2em;
    letter-spacing: 2px;
    cursor:pointer;
    &:hover {
        background: linear-gradient(to right, #f7b5c9, #f7b5c9);
        color: white;
    }
    `,
  ToJoin: styled.a`
    margin: auto;
    text-decoration-line: none;
    text-decoration-line: none;
    `,

};

const JoinForm = (props) => {
  // redux의 dispatch
  const dispatch = useDispatch();

  // react hook에서 state 사용
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');


  // handler 함수들
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호 확인이 일치하지 않습니다.');
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    // action을 dispatch해준다.
    dispatch(joinUser(body))
    props.history.push('/');
    alert('회원가입 되셨습니다.');
    // // action을 dispatch해준다.
    // const onSubmit = async body =>{
    //   dispatch(checkUser(body))
    //   .then((response) => {
    //     if (response.payload.checkUser) {
    //       props.history.push('/');
    //       alert('회원가입 되셨습니다.');
    //     } else {
    //       alert('회원가입에 실패했습니다.');
    //     }
    //   });
    // }

  };

  return (
    <St.Container>
      <St.Login onSubmit={onSubmitHandler}>
        <St.Head>WELCOME</St.Head>
        <St.Login_id>
          <h4>E-mail</h4>
          <St.Input type="email" value={Email} onChange={onEmailHandler} name="Email" id="" placeholder="Email" />
        </St.Login_id>
        <St.Join_name>
          <h4>Name</h4>
          <St.Input type="text" value={Name} onChange={onNameHandler} name="Name" id="" placeholder="Name" />
        </St.Join_name>
        <St.Login_pw>
          <h4>Password</h4>
          <St.Input type="password" value={Password} onChange={onPasswordHandler} name="Password" id="" placeholder="Password" />
        </St.Login_pw>
        <St.Login_pw>
          <h4>Password Confirm</h4>
          <St.Input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} name="ConfirmPassword" id="" placeholder="Password Confirm" />
        </St.Login_pw>
        <St.Submit>
          <St.Submit_button type="submit">JOIN</St.Submit_button>
        </St.Submit>
      </St.Login>
    </St.Container>
  )
}

export default withRouter(JoinForm);
