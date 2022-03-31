import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { auth, update } from '../../reducer/action/user';
import { Link, withRouter } from 'react-router-dom';

import { useForm } from 'react-hook-form';

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
  const [userPassword, setUserPassword] = useState('');
  const [userWalletaddress, setUserWalletaddress] = useState('');
  const [userMoney, setUserMoney] = useState('');
  const [userCoin, setUserCoin] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {email : userEmail, name: userName, money: userMoney},
  });

  const getInfo = () => {
    dispatch(auth()).then(response => {
      if (response.payload.userData != null) {
        setUserName(response.payload.userData.name);
        setUserEmail(response.payload.userData.email);
        // setUserPassword(response.payload.userData.password);
        setUserWalletaddress(response.payload.userData.walletaddress);
        setUserMoney(response.payload.userData.money);
        setUserCoin(response.payload.userData.coin);
      }
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const emailchage = (e) => {
    setUserEmail(e.currentTarget.value);
  };
  const namechage = (e) => {
    setUserName(e.currentTarget.value);
  };
  const moneychage = (e) => {
    setUserMoney(e.currentTarget.value);
  };

  const onEdit = useCallback(user => {
    console.log(user);
    dispatch(update(user)).then(response => {
      if (response.payload.success) {
        alert(`회원정보 변경 성공.`);
        window.location.replace('/mypage');
      } else {
        alert(response.payload.message);
      }
    });
  }, []);

  return (
    <St.Container>
      <St.Login onSubmit={handleSubmit(onEdit)}>
        <St.Head>MY PAGE</St.Head>
        <St.Id>
          <h4>E-mail</h4>
          <St.Input 
            id="email"
            name="email"
            type="email"
            value={userEmail}
            onChange={emailchage}
            //ref={register}
            {...register('email')}
          />
        </St.Id>
        <St.Name>
          <h4>Name</h4>
          <St.Input 
            id="neme"
            name="name"
            type="text"
            value={userName}
            onChange={namechage}
            {...register('name')}
          />
        </St.Name>
        <St.Pw>
          <h4>Password</h4>
          <St.Input 
            id="password"
            name="password"
            type="password"
            value={userPassword}
            readOnly
          />
        </St.Pw>
        <St.Pw>
          <h4>My Wallet Address</h4>
          <St.Input value={userWalletaddress} readOnly/>
        </St.Pw>
        <St.Head>MY WALLET</St.Head>
        <St.Id>
          <h4>Money</h4>
          <St.Input
            id="money"
            name="money"
            type="number"
            value={userMoney}
            onChange={moneychage}
            {...register('money')}
          />
        </St.Id>
        <St.Name>
          <h4>Coin</h4>
          <St.Input value={userCoin} readOnly/>
        </St.Name>
        <St.Submit>
          <St.Submit_button type="submit" onClick={handleSubmit(onEdit)}>Edit</St.Submit_button>
        </St.Submit>
      </St.Login>
    </St.Container>
  )
}

export default withRouter(MypageForm);
