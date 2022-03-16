import React from "react";
import styled from "styled-components";
import withSize from "../Container/withSize";
import Header from "../Components/Global/Header";
import LoginForm from "../Components/Login/LoginForm";
import Footer from "../Components/Global/Footer";

const St = {
  LoginContentContainer: styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    max-width: 1500px;
    margin: 0 auto;
    width: 100%;
    height: 100%;

    @media ${({ theme }) => theme.tablet} {
      margin-top: 0;
      margin-bottom: 0;
    }
  `,

};

const Login = ({ match, widthSize, heightSize }) => {
  const isRootURL = match.path === "/";

  return (
    <>
      <Header isRootURL={isRootURL} />
      <St.LoginContentContainer>
        <LoginForm />
      </St.LoginContentContainer>
      <Footer />
    </>
  );
};

export default withSize()(React.memo(Login));
