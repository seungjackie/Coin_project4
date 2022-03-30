import React, { useState, useCallback } from 'react';
import { EmailError, PasswordError } from '../../lib/options/errors';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../../reducer/action/user';
import { useForm } from 'react-hook-form';
import {
  // FormBox,
  // FormTitle,
  // InputBox,
  // PasswordBox,
  // PasswordButton,
  // LoginButton,
  // FilledInput,
  ErrorMessage,
  // TextBox,
} from '../../styles/form/styles';

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
    /* color: rgb(231, 234, 239); */
    color: white;
    font-size: 3em;
    font-weight: bolder;
    text-shadow: 1px 2px 3px black;
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
  Login_etc: styled.div`
    padding: 10px;
    width: 80%;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
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
    `,
};

// const LoginForm = (props) => {

//   // redux의 dispatch
//   const dispatch = useDispatch();

//   // react hook에서 state 사용
//   const [Email, setEmail] = useState('');
//   const [Password, setPassword] = useState('');

//   //handler 함수
//   const onEmailHandler = (event) => {
//     setEmail(event.currentTarget.value);
//   }

//   const onPasswordHandler = (event) => {
//     setPassword(event.currentTarget.value);

//   }
//   const onSubmitHandler = (event) => {
//     event.preventDefault();

//     let body = {
//       email: Email,
//       password: Password,
//     };

//     // action의 반환값을 dispatch해준다.
//     dispatch(loginUser(body))
//     .then((response) => {
//       if(response.payload.loginSuccess) {
//         window.location.replace('/')
//       } else {
//         alert("로그인 정보를 확인하세요.")
//         window.location.replace('/login')
//       }
//     });
//   };
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const dispatch = useDispatch();
  const [ShowPassword, setShowPassword] = useState(false);
  const [RememberId, setRememberId] = useState(false);

  const handleVisibility = () => {
    setShowPassword(!ShowPassword);
  };
  const handleChange = e => {
    setRememberId(e.target.checked);
  };

  const onSubmit = useCallback(user => {
    dispatch(loginUser(user)).then(response => {
      if (response.payload.success) {
        alert(`${response.payload.name}님 환영합니다.`);
        console.log(response.payload._id);
        // 로컬스토리지 userId 저장
        window.localStorage.setItem('userId', response.payload._id);
        window.localStorage.setItem('userName', response.payload.name);
        window.location.replace('/');
      } else {
        alert(response.payload.message);
      }
    });
  }, []);



  return (
    <St.Container>
      <St.Login onSubmit={handleSubmit(onSubmit)}>
        <St.Head>Log-in</St.Head>
        <St.Login_id>
          <h4>E-mail</h4>
          <St.Input
            id="email"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            {...register('email', {
              required: true,
              validate: {
                checkPattern: value =>
                  [/^\S+@\S+$/i].every(pattern => pattern.test(value)),
              },
            })} />
          {errors.email && (
            <ErrorMessage>{EmailError[errors.email.type]}</ErrorMessage>
          )}
        </St.Login_id>
        <St.Login_pw>
          <h4>Password</h4>
          <St.Input id="password"
            name="password"
            type={ShowPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 20,
              // validate: {
              //   checkLang: value =>
              //     ![/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/].every(pattern =>
              //       pattern.test(value),
              //     ),
              //   checkLower: value =>
              //     [/[a-z]/].every(pattern => pattern.test(value)),
              //   checkUpper: value =>
              //     [/[A-Z]/].every(pattern => pattern.test(value)),
              //   checkNumber: value =>
              //     [/[0-9]/].every(pattern => pattern.test(value)),
              //   checkSpec: value =>
              //     [/[^a-zA-Z0-9]/].every(pattern => pattern.test(value)),
              // },
            })} />
        </St.Login_pw>
        <St.Login_etc>
          <St.ToJoin href="/join">아직 회원이 아니신가요?</St.ToJoin>
        </St.Login_etc>
        <St.Submit>
          <St.Submit_button type="submit">LOGIN</St.Submit_button>
        </St.Submit>
      </St.Login>
    </St.Container>
  )
}

export default withRouter(LoginForm);
