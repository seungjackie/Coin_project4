import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { auth, update } from '../../reducer/action/user';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userWalletaddress, setUserWalletaddress] = useState('');
  const [userMoney, setUserMoney] = useState('');
  const [userCoin, setUserCoin] = useState('');

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

  const emailchange = (e) => {
    setUserEmail(e.currentTarget.value);
  };
  const namechange = (e) => {
    setUserName(e.currentTarget.value);
  };  
  const passwordchange = (e) => {
    setUserPassword(e.currentTarget.value);
  };
  const moneychange = (e) => {
    setUserMoney(e.currentTarget.value);
  };

  const onEdit = async() => {
    axios.post("http://localhost:4000/api/user/update", {
      _id: window.localStorage.getItem('userId'),
      email: userEmail,
      name: userName,
      password: userPassword,
    }).then((response) => { if(response.data.message) {
        alert("실패")
        window.location.replace("/mypage")
      } else {
        alert("success");
        window.location.replace("/mypage")
      }
    })
  };
  
  const onLoadmoney = async() => {
    axios.post("http://localhost:4000/api/user/loadmoney", {
      email: userEmail,
      money: userMoney,
    }).then((response) => { if(response.data.message) {
        alert("실패")
        window.location.replace("/mypage")
      } else {
        alert("success");
        window.location.replace("/mypage")
      }
    })
  };


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
            onChange={emailchange}
          />
        </St.Id>
        <St.Name>
          <h4>Name</h4>
          <St.Input 
            id="neme"
            name="name"
            type="text"
            value={userName}
            onChange={namechange}
          />
        </St.Name>
        <St.Pw>
          <h4>Password</h4>
          <St.Input 
            id="password"
            name="password"
            type="password"
            placeholder='*********'
            value={userPassword}
            onChange={passwordchange}
          />
        </St.Pw>
        <St.Submit>
          <St.Submit_button type="submit" onClick={handleSubmit(onEdit)}>Edit</St.Submit_button>
        </St.Submit>
      </St.Login>
      <St.Login onSubmit={handleSubmit(onLoadmoney)}>
        <St.Head>MY WALLET</St.Head>
        <St.Pw>
          <h4>My Wallet Address</h4>
          <St.Input value={userWalletaddress} readOnly/>
        </St.Pw>        
        <St.Id>
          <h4>Money</h4>
          <St.Input
            id="money"
            name="money"
            type="number"
            value={userMoney}
            onChange={moneychange}
          />
        </St.Id>
        <St.Name>
          <h4>Coin</h4>
          <St.Input value={userCoin} readOnly/>
        </St.Name>
        <St.Submit>
          <St.Submit_button type="submit" onClick={handleSubmit(onLoadmoney)}>Load Money</St.Submit_button>
        </St.Submit>
      </St.Login>
    </St.Container>
  )
}

export default withRouter(MypageForm);
