import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const St = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 212px;
    background-color: white;
    font-size: 0.8rem;
    color: #666;
  `,
};

const OrderInfoTradeList = ({ theme }) => {
  const user = useSelector(state => state.user);


  return (
    <>
      {user.userData && !user.userData.isAuth ? (
        <St.Container>로그인 후 사용 가능합니다.</St.Container>
      ) : (
        <St.Container>거래내역입니다.</St.Container>
      )}
    </>
  )
};

export default React.memo(OrderInfoTradeList);
