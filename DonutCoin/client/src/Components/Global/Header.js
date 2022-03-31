import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { auth } from '../../reducer/action/user';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const St = {
  Header: styled.header`
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 60px;
    background-color: #f7b5c9;
    /* background-color: #1296d3; */
    /* background-color: #fef040; */
  `,
  Container: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1360px;
    margin: 0 auto;

    @media ${({ theme, isRootURL }) => (!isRootURL ? theme.tablet : true)} {
      max-width: 950px;
    }

    @media ${({ theme, isRootURL }) => (isRootURL ? theme.tablet : true)} {
      max-width: 100%;
    }
  `,
  SiteHeading: styled.div`
    padding: 10px;
    /* background-color: red; */
    width: 200px;
    height: 100%;
  `,
  SiteHeadingExplore: styled.div`
    padding: 0px;
    /* background-color: red; */
    width: 200px;
    height: 100%;
  `,
  SiteHeadingMypage: styled.div`
    padding: 5px;
    /* background-color: red; */
    width: 200px;
    height: 100%;
  `,

  Link: styled.a`
    display: block;
    background-image: ${({ logo }) => `url(${logo})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    width: 100%;
    height: 100%;
    font-size: 50px;
  `,
  LinkExploer: styled.a`
    display: block;
    background-image: ${({ logo }) => `url(${logo})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    width: 150%;
    height: 150%;
  `,
  Head: styled.a`
    display: flex;
    background-image: ${({ logo }) => `url(${logo})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    width: 100%;
    height: 100%;
  `,
  HeadProfile: styled.input`
    display: flex;
    background-image: ${({ logo }) => `url(${logo})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    width: 100%;
    height: 100%;
  `,
};

const Header = (props, { isRootURL }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const user = useSelector(state => state.user);

  const onClickLogout = (props) => {
    axios.get('/api/user/logout').then(response => {
      if (response.data.success) {
        localStorage.removeItem('key');
        localStorage.clear();
        props.history.push('/');
        window.location.reload();
      } else {
        alert('로그아웃 실패');
      }
    });
  };

  const getName = () => {
    dispatch(auth()).then(response => {
      if (response.payload.userData != null) {
        setUserName(response.payload.userData.name);
      }
    });
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <St.Header>

      <St.SiteHeading>
        <St.Head
          href="/intro"
          logo={process.env.PUBLIC_URL + "/mainLogo2.png"}
          title={"메인페이지 이동"}
        >
        </St.Head>
      </St.SiteHeading>

      <St.Container isRootURL={isRootURL}>
        <St.SiteHeading>
          <St.Link
            href="/trade"
            logo={process.env.PUBLIC_URL + "/chartWhiteLogo.png"}
            title={"거래소 이동"}
          >
          </St.Link>
        </St.SiteHeading>

        <St.SiteHeadingExplore>
          <St.Link
            href="/explorer"
            logo={process.env.PUBLIC_URL + "/explorerWhiteLogo.png"}
            title={"익스플로러 이동"}
          >
          </St.Link>
        </St.SiteHeadingExplore>


        <St.SiteHeadingMypage>
          <St.Link
            href="/mypage"
            logo={process.env.PUBLIC_URL + "/mypageWhiteLogo.png"}
            title={"마이페이지 이동"}
          >
          </St.Link>
        </St.SiteHeadingMypage>

      </St.Container>

      {user.userData && !user.userData.isAuth ? (
        <St.SiteHeading>
          <St.Head
            href="/login"
            logo={process.env.PUBLIC_URL + "/loginWhiteLogo.png"}
            title={"로그인 이동"}
          >
          </St.Head>
        </St.SiteHeading>
      ) : (
        <>
          <Link to="/mypage" className="profileBox">
            <input
              type="text"
              className="userName"
              value={userName + '님 환영합니다.'}
              readOnly
            />
          </Link>
          <Link to="/">
            <button onClick={onClickLogout} className="logoutbar">
              로그아웃
            </button>
          </Link>

        </>
      )}
    </St.Header>
  );
};

export default Header;


