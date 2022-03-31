import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getMyWallet, buyCoin, sellCoin } from '../../reducer/action/wallet';
import { useForm } from 'react-hook-form';
import {
  changeAmountAndTotalPrice,
  changePriceAndTotalPrice,
  changeTotalPriceAndAmount,
} from "../../reducer/modules/coinReducer";
import OrderInfoTradeList from "./OrderInfoTradeList";

const St = {
  Container: styled.section`
    width: 100%;
    height: 50%;
    background-color: white;
  `,
  OrderTypeContainer: styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.8rem;
    }
  `,
  OrderType: styled.button`
    width: 33.33%;
    height: 100%;
    background-color: white;
    border: none;
    border-bottom: 3px solid
      ${({ borderBottom }) => borderBottom || "tranceparent"};
    outline: 0;
    font-weight: 900;
    color: ${({ fontColor }) => fontColor || "black"};
  `,
  OrderInfoContainer: styled.form`
    width: 100%;
    padding: 15px;
    padding-top: 0;

    @media ${({ theme }) => theme.mobileS} {
      padding: 5px;
    }
  `,
  OrderInfoDetailContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 38px;
    margin-top: 15px;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.6rem;
      margint-right: 10px;
    }
  `,
  OrderInfoDetailTitle: styled.span`
    display: block;
    width: 20%;
    min-width: 52px;
    max-width: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    margin-left: 5px;
    margin-right: 5px;
  `,
  OrderInfoInputContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `,
  OrderInfoInput: styled.input`
    width: ${({ width }) => width || "100%"};
    height: 100%;
    margin: 0;
    padding: 5px;
    padding-right: 15px;
    border: 1px solid ${({ theme }) => theme.lightGray2};
    text-align: right;
    font-size: 0.95rem;
    font-weight: ${({ fontWeight }) => fontWeight};
    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.6rem;
    }
  `,
  Button: styled.button`
    width: ${({ width }) => width || "50px"};
    min-width: ${({ minWidth }) => minWidth};
    height: ${({ height }) => height || "38px"};
    margin-right: ${({ marginRight }) => marginRight};
    background-color: ${({ bgColor }) => bgColor || "tranceparent"};
    border: none;
    border-top: 1px solid ${({ borderColor }) => borderColor || "tranceparent"};
    border-right: 1px solid
      ${({ borderColor }) => borderColor || "tranceparent"};
    border-bottom: 1px solid
      ${({ borderColor }) => borderColor || "tranceparent"};
    outline: none;
    color: ${({ fontColor }) => fontColor || "black"};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: 900;
  `,
  PossibleAmount: styled.span`
    display: block;
    width: 100%;
    text-align: right;
    font-size: 1.2rem;
    font-weight: 600;
    @media ${({ theme }) => theme.mobileS} {
      font-size: 1rem;
    }
  `,
  Unit: styled.span`
    margin-left: 5px;
    font-size: 0.8rem;
    font-weight: 500;
  `,
  OrderBtnContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 50px;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.8rem;
    }
  `,
};

const OrderInfoAskBid = ({
  theme,
  selectedAskBidOrder,
  coinSymbol,
  orderPrice,
  orderAmount,
  orderTotalPrice,

}) => {
  // order
  const {
    order,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  let userFrom = localStorage.getItem('userId')

  useEffect(() => {
    // FetchMyWallet();
    // getBoardName(coinNameKor)
    // console.log('coinNameKor:', coinNameKor)
  }, [selectedAskBidOrder, coinSymbol]);

  const changePrice = useCallback(
    (e) =>
      dispatch(
        changePriceAndTotalPrice(
          parseInt(e.target.value.replace(/[^0-9-.]/g, ""))
        )
      ),
    [dispatch]
  );
  const changeAmount = useCallback(
    (e) => {
      dispatch(
        changeAmountAndTotalPrice(e.target.value.replace(/[^0-9-.]/g, ""))
      );
    },
    [dispatch]
  );
  const changeTotalPrice = useCallback(
    (e) =>
      dispatch(
        changeTotalPriceAndAmount(
          parseInt(e.target.value.replace(/[^0-9-.]/g, ""))
        )
      ),
    [dispatch]
  );

  const toLogin = () => {
    window.location.href = '/login'
  };
  const toJoin = () => {
    window.location.href = '/join'
  };


  // ------------------------------------ //


  // const FetchMyWallet = () => {
  //   dispatch(getMyWallet({}))
  // }

  // const onBuy = data => {
  //   console.log("data", data)
  //   try {
  //     dispatch(buyCoin(data).then(response => {
  //       console.log("onBuy")
  //       if (response.payload.success) {
  //         window.location.reload();
  //         // alert(`${buyAmount} 주문완료 하였습니다`)
  //         alert(`매수 주문을 완료 하였습니다`)
  //       } else {
  //         alert('매수 주문에 실패 하였습니다')
  //       }
  //     }))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // const onSell = data => {
  //   try {
  //     dispatch(sellCoin(data))
  //     console.log("onSell")
  //     if (response.payload.sucess) {
  //       window.location.reload();
  //       // alert(`${buyAmount} 주문완료 하였습니다`)
  //       alert(`매도 주문을 완료 하였습니다`)
  //     } else {
  //       alert('매도 주문에 실패 하였습니다')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // -----------------------//

  const onSubmit = useCallback(data => {
    dispatch(buyCoin(data)).then(response => {
      if (response.payload.success) {
        alert(`${response.payload.name}님 환영합니다.`);
        console.log(response.payload._id);
        // 로컬스토리지 userId 저장
        window.localStorage.setItem('userId', response.payload._id);
        window.localStorage.setItem('userName', response.payload.name);
        window.location.replace('/');
      } else {
        alert(response.payload.message);
      }
    });
  }, []);

  return (
    <St.OrderInfoContainer theme={theme}>
      {selectedAskBidOrder !== "tradeList" ? (
        <>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>주문가능</St.OrderInfoDetailTitle>
            <St.PossibleAmount>
              100,000,000,000,000,000
              <St.Unit>
                {selectedAskBidOrder === "bid" ? "KRW" : coinSymbol}
              </St.Unit>
            </St.PossibleAmount>
          </St.OrderInfoDetailContainer>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>
              {selectedAskBidOrder === "bid" ? "매수가격" : "매도가격"}
            </St.OrderInfoDetailTitle>
            <St.OrderInfoInputContainer>
              <St.OrderInfoInput
                id="price"
                name="price"
                onChange={changePrice}
                value={orderPrice ? orderPrice.toLocaleString() : ""}
                fontWeight={800}
                placeholder={0}
              />
              <St.Button
                bgColor={theme.lightGray}
                borderColor={theme.lightGray2}
                fontColor={"#666"}
                fontSize={"1.1rem"}
              >
                +
              </St.Button>
              <St.Button
                bgColor={theme.lightGray}
                borderColor={theme.lightGray2}
                fontColor={"#666"}
                fontSize={"1.1rem"}
              >
                -
              </St.Button>
            </St.OrderInfoInputContainer>
          </St.OrderInfoDetailContainer>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>주문수량</St.OrderInfoDetailTitle>
            <St.OrderInfoInput
              id="orderAmount"
              name="orderAmount"
              onChange={changeAmount}
              value={orderAmount ? orderAmount.toLocaleString() : ""}
              placeholder={0}
            />
          </St.OrderInfoDetailContainer>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>주문총액</St.OrderInfoDetailTitle>
            <St.OrderInfoInput
              name="orderAmount"
              id="orderAmount"
              onChange={changeTotalPrice}
              value={orderTotalPrice ? orderTotalPrice.toLocaleString() : ""}
              placeholder={0}
            />
          </St.OrderInfoDetailContainer>
        </>
      ) : (
        <OrderInfoTradeList theme={theme} />
      )}
      {user.userData && !user.userData.isAuth ? (
        <>
          <St.OrderBtnContainer>

            <St.Button
              width={"30%"}
              minWidth={"70px"}
              marginRight={"5px"}
              bgColor={theme.deepBlue}
              fontSize={"0.9rem"}
              fontColor={"white"}
              onClick={toJoin}
            >
              회원가입
            </St.Button>
            <St.Button
              width={"65%"}
              bgColor={theme.priceDown}
              fontSize={"0.9rem"}
              fontColor={"white"}
              onClick={toLogin}
            >
              로그인
            </St.Button>
          </St.OrderBtnContainer>
        </>
      ) : (
        <>
          <St.OrderBtnContainer>

            <St.Button
              width={"30%"}
              minWidth={"70px"}
              marginRight={"5px"}
              bgColor={theme.deepBlue}
              fontSize={"0.9rem"}
              fontColor={"white"}
              type='reset'

            >
              초기화
            </St.Button>
            {selectedAskBidOrder === "bid" ? (
              <St.Button
                id="buy"
                width={"65%"}
                bgColor={theme.priceUp}
                fontSize={"0.9rem"}
                fontColor={"white"}
                type='submit'
                onClick={"onBuy"}
              >
                매수
              </St.Button>
            ) : (
              <St.Button
                id="sell"
                width={"65%"}
                bgColor={theme.priceDown}
                fontSize={"0.9rem"}
                fontColor={"white"}
                type='submit'
                onClick={"onSell"}
              >
                매도
              </St.Button>
            )}

          </St.OrderBtnContainer>
        </>
      )}
    </St.OrderInfoContainer>
  );
};

export default React.memo(OrderInfoAskBid);
