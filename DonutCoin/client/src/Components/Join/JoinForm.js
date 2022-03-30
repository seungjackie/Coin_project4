import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser, checkUser } from 'reducer/modules/user';

import { useForm } from 'react-hook-form';
import styled from "styled-components";


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
function JoinForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const dispatch = useDispatch();
  const password = useRef();
  password.current = watch('password');

  const [ShowPassword, setShowPassword] = useState(false);
  const handleVisibility = () => {
    setShowPassword(!ShowPassword);
  };

  const onSubmit = async data => {
    // console.log(data);
    try {
      await dispatch(checkUser(data.email))
        .then(response => {
          if (response.payload.success) {
            dispatch(registerUser(data));
            alert(`${data.name}님 회원가입을 축하드립니다.`);
            props.history.push('/login');
          } else {
            setError('email', {
              type: 'validate',
              message: response.payload.message,
            });
          }
        })
        .catch(error => {
          console.log('response: ', error.response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <St.Container>
      <St.Login onSubmit={handleSubmit(onSubmit)}>
        <St.Head>WELCOME</St.Head>
        <St.Login_id>
          <h4>E-mail</h4>
          <St.Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일 형식에 맞게 입력해주세요."
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })} />
        </St.Login_id>
        <St.Join_name>
          <h4>Name</h4>
          <St.Input
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요."
            {...register('name', {
              required: true,
              minLength: true,
              minLength: 2,
              maxLength: 8,
            })} />
        </St.Join_name>
        <St.Login_pw>
          <h4>Password</h4>
          <St.Input id="password"
            name="password"
            type={ShowPassword ? 'text' : 'password'}
            placeholder="대/소문자, 숫자, 특수문자 포함 8~20자"
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: {
                checkLang: value =>
                  ![/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/].every(pattern =>
                    pattern.test(value),
                  ),
                // checkLower: value =>
                //   [/[a-z]/].every(pattern => pattern.test(value)),
                // checkUpper: value =>
                //   [/[A-Z]/].every(pattern => pattern.test(value)),
                // checkNumber: value =>
                //   [/[0-9]/].every(pattern => pattern.test(value)),
                // checkSpec: value =>
                //   [/[^a-zA-Z0-9]/].every(pattern => pattern.test(value)),
              },
            })} />
        </St.Login_pw>
        <St.Login_pw>
          <h4>Password Confirm</h4>
          <St.Input id="confirmpassword"
            name="confirmpassword"
            type="password"
            placeholder="비밀번호 확인"
            {...register('passwordConfirm', {
              required: true,
              validate: value => value === password.current,
            })} />
        </St.Login_pw>
        <St.Submit>
          <St.Submit_button type="submit" onClick={handleSubmit(onSubmit)}>JOIN</St.Submit_button>
        </St.Submit>
      </St.Login>
    </St.Container>
  )
}

export default withRouter(JoinForm);
