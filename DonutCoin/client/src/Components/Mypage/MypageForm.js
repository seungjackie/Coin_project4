import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { auth } from '../../reducer/action/user';
import { Link, withRouter } from 'react-router-dom';


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
  Id: styled.div`
    margin-top: 20px;
    width: 80%;
  `,
  Name: styled.div`
    margin-top: 20px;
    width: 80%;
  `,
  Pw: styled.div`
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
    letter-spacing: 5px;
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
function MypageForm(props) {

  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  // const [userPassword, setUserPassword] = useState('');

  const getInfo = () => {
    dispatch(auth()).then(response => {
      if (response.payload.userData != null) {
        setUserName(response.payload.userData.name);
        setUserEmail(response.payload.userData.email);
        // setUserPassword(response.payload.userData.password);

      }
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const onEdit = useCallback(user => {
    dispatch(updateEmail(user)).then(response => {
      if(response.payload.success) {
        
      }

    })
  })

  return (
    <St.Container>
      <St.Login>
        <St.Head>MY PAGE</St.Head>
        <St.Id>
          <h4>E-mail</h4>
          <St.Input value={userEmail}/>
        </St.Id>
        <St.Name>
          <h4>Name</h4>
          <St.Input value={userName}/>
        </St.Name>
        <St.Pw>
          <h4>Password</h4>
          <St.Input
          />
        </St.Pw>
        <St.Pw>
          <h4>My Wallet Address</h4>
          <St.Input/>
        </St.Pw>
        <St.Submit>
          <St.Submit_button type="submit" >Edit</St.Submit_button>
        </St.Submit>
      </St.Login>
    </St.Container>
  )
}

export default withRouter(MypageForm);
