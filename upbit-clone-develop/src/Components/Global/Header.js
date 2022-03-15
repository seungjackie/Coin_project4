import React from "react";
import styled from "styled-components";

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
    justify-content: space-between;
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
  SiteHeading: styled.h1`
    padding: 0 20px;
    width: 150px;
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
  `,
  Head: styled.a`
    /* padding: 20px; */
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

const Header = ({ isRootURL }) => {
  return (
    <St.Header>
  
      <St.SiteHeading>
        <St.Head
            href="/intro"
            logo={process.env.PUBLIC_URL + "/mainLogo.png"}
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

        <St.SiteHeading>
          <St.Link
              href="/explorer"
              logo={process.env.PUBLIC_URL + "/explorerWhiteLogo.png"}
              title={"익스플로러 이동"}
            >
          </St.Link>
        </St.SiteHeading>

        <St.SiteHeading>
          <St.Link
              href="/game"
              logo={process.env.PUBLIC_URL + "/gameWhiteLogo.png"}
              title={"게임존 이동"}
            >
          </St.Link>
        </St.SiteHeading>

        <St.SiteHeading>
          <St.Link
              href="/mypage"
              logo={process.env.PUBLIC_URL + "/mypageWhiteLogo.png"}
              title={"마이페이지 이동"}
            >
          </St.Link>
        </St.SiteHeading>

      </St.Container>

      <St.SiteHeading>
        <St.Head
            href="/login"
            logo={process.env.PUBLIC_URL + "/loginWhiteLogo.png"}
            title={"로그인 이동"}
          >
          </St.Head>
        </St.SiteHeading>

    </St.Header>
  );
};

export default Header;
