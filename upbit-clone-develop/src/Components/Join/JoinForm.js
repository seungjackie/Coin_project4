import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'


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
  
  return (
    <St.Container>
        <St.Login>
            <St.Head>WELCOME</St.Head>
            <St.Login_id>
                <h4>E-mail</h4>
                <St.Input type="email" value={Email} onChange={onEmailHandler} name="" id="" placeholder="Email" />
            </St.Login_id>
            <St.Join_name>
                <h4>Name</h4>
                <St.Input type="text" value={Name} onChange={onNameHandler} name="" id="" placeholder="Name" />
            </St.Join_name>
            <St.Login_pw>
                <h4>Password</h4>
                <St.Input type="password" value={Password} onChange={onPasswordHandler} name="" id="" placeholder="Password" />
            </St.Login_pw>
            <St.Login_pw>
                <h4>Password Confirm</h4>
                <St.Input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} name="" id="" placeholder="Password Confirm" />
            </St.Login_pw>
            <St.Submit>
                <St.Submit_button type="submit">JOIN</St.Submit_button>
            </St.Submit>
        </St.Login>
    </St.Container>
  )
}

export default withRouter(JoinForm);
