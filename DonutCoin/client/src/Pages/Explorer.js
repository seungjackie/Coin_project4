import React from "react";
import styled from "styled-components";
import withSize from "../Container/withSize";
import BlockSerach from "../Components/explorer/BlockSerach";
import Header from "../Components/Global/Header";
import Footer from "../Components/Global/Footer";

const Main = ({ match, widthSize, heightSize }) => {
  const isRootURL = match.path === "/";

  return (
    <>
      <Header isRootURL={isRootURL} />
      <BlockSerach/>
      <Footer />
    </>
  );
};

export default withSize()(React.memo(Main));
