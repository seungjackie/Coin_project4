import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { searchCoin } from "../../reducer/modules/coinReducer";
import { useDispatch, useSelector } from "react-redux";

import CoinListItem from "./CoinListItem";
import Loading from "../Global/Loading";

import withThemeData from "../../Container/withThemeData";
import withSelectedOption from "../../Container/withSelectedOption";
import withMarketNames from "../../Container/withMarketNames";
import withLatestCoinData from "../../Container/withLatestCoinData";
import withLoadingData from "../../Container/withLoadingData";
// const DncLogo = require("./favicon3.png")

const St = {
  CoinListContainer: styled.article`
    display: none;
    position: -webkit-sticky; /* 사파리  */
    position: sticky;
    top: 70px;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow: hidden;

    @media ${({ theme }) => theme.desktop} {
      display: block;
      max-width: 400px;
      height: ${({ heightSize }) => `${heightSize}px`};
      margin-left: 10px;
    }

    @media ${({ theme, isRootURL }) => (!isRootURL ? theme.mobileM : true)} {
      display: none;
    }

    @media ${({ theme, isRootURL }) => (isRootURL ? theme.tablet : true)} {
      display: block;
      margin-top: 0;
      margin-bottom: 0;
      height: ${({ heightSize }) =>
      `${heightSize + 80}px`}; // 모바일 풀 화면을 위해 다시 80px 더해줌
    }
  `,
  HiddenH3: styled.h3`
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0, 0);
    clip-path: polygon(0, 0);
    overflow: hidden;
    text-indent: -9999px;
  `,
  CoinSearchContainer: styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
  `,
  CoinSearchInput: styled.input`
    width: 100%;
    border: none;
    padding: 5px;
    padding-left: 12px;
    &::placeholder {
      font-size: 0.7rem;
      color: gray;
      font-weight: 700;
    }
  `,
  CoinSearchBtn: styled.button`
    width: 30px;
    height: 30px;
    background: url("https://cdn.upbit.com/images/bg.e801517.png") -83px 2px no-repeat;
    background-color: white;
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;
    border: none;
  `,
  CoinSearchBtn2: styled.button`
    width: 30px;
    height: 30px;
    background : url("../../../../public/favicon2.png");
    background-color: white;
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;
    border: none;
  `,
  CoinSortContainer: styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
    font-size: 0.9rem;
    font-weight: 800;
    color: #666666;
  `,
  CoinSortList: styled.li`
    width: ${({ width }) => width || "20%"};
    text-align: ${({ textAlign }) => textAlign || "right"};
    margin-right: ${({ marginRight }) => marginRight || 0};
    font-size: 0.78rem;
  `,
  CoinUl: styled.ul`
    height: ${({ heightSize }) => `${heightSize + 70}px`};
    min-height: 800px;
    background-color: white;
    overflow-y: scroll;
    scrollbar-color: ${({ theme }) => theme.middleGray};
    scrollbar-width: thin;
    scrollbar-base-color: ${({ theme }) => theme.middleGray};
    &::-webkit-scrollbar {
      width: 5px;
      background-color: white;
      border-radius: 5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.middleGray};
      border-radius: 5rem;
    }

    @media ${({ theme }) => theme.desktop} {
      display: block;
      max-width: 400px;
      height: ${({ heightSize }) => `${heightSize}px`};
    }
  `,
};




const CoinList = ({
  theme,
  marketNames,
  sortedMarketNames,
  latestCoinData,
  selectedMarket,
  searchCoinInput,
  isMarketNamesLoading,
  isInitCandleLoading,
  heightSize,
  isRootURL,
}) => {
  const dispatch = useDispatch();
  const [DNCmarketNames, setDNCmarketNames] = useState();
  const [DNCsortedMarketNames, setDNCsortedMarketNames] = useState();
  const [DNClatestCoinData, setDNClatestCoinData] = useState();
  const DNCname = { 'KRW-DNC': { korean: '도넛코인', english: 'Donutcoin' } }
  useEffect(() => {
    // console.log(selectedMarket)
    // setDNCmarketNames(Object.assign(DNCname, marketNames))
    setDNCmarketNames(marketNames)
    setDNCsortedMarketNames(sortedMarketNames)
    // setDNCsortedMarketNames([...sortedMarketNames, 'KRW-DNC'])
    // console.log(DNCmarketNames)
    // console.log(DNCsortedMarketNames)
    let BTCdata = { 'KRW-DNC': latestCoinData['KRW-BTC'] }
    // setDNClatestCoinData();
    // console.log(latestCoinData['KRW-BTC'])
    // console.log(BTCdata)
    setDNClatestCoinData(Object.assign(BTCdata, latestCoinData))
    // console.log(DNClatestCoinData)
    // console.log(DNCsortedMarketNames[-1])
  }, [marketNames, sortedMarketNames, latestCoinData, selectedMarket])

  // console.log(marketNames['KRW-BTC'])
  // console.log(sortedMarketNames)
  // console.log(latestCoinData['KRW-BTC'])
  // 
  // setDNCmarketNames(Object.assign(DNCname, marketNames))
  // if (Object.keys(sortedMarketNames).length > 100 && !sortedMarketNames.hasOwnProperty('KRW-DNC')) {
  //   // console.log(sortedMarketNames)
  //   setDNCsortedMarketNames(sortedMarketNames.push('KRW-DNC'))
  // }
  // console.log(sortedMarketNames)
  // let BTCdata = { 'KRW-DNC': latestCoinData['KRW-BTC'] }
  // console.log(latestCoinData['KRW-BTC'])
  // setDNClatestCoinData(Object.assign(BTCdata, latestCoinData))
  // console.log(DNClatestCoinData)



  return (
    <St.CoinListContainer isRootURL={isRootURL} heightSize={heightSize - 80}>
      <St.HiddenH3>코인 리스트</St.HiddenH3>
      <St.CoinSearchContainer>
        <St.CoinSearchInput
          type="search"
          onChange={(e) => dispatch(searchCoin(e.target.value))}
          value={searchCoinInput}
          placeholder={"코인명/심볼검색"}
        />
        <St.CoinSearchBtn />
      </St.CoinSearchContainer>
      <St.CoinSortContainer>
        <St.CoinSortList width={"50px"} />
        <St.CoinSortList textAlign={"left"}>한글명</St.CoinSortList>
        <St.CoinSortList>현재가</St.CoinSortList>
        <St.CoinSortList>상승률</St.CoinSortList>
        <St.CoinSortList width={"25%"} marginRight={"10px"}>
          거래대금
        </St.CoinSortList>
      </St.CoinSortContainer>
      <St.CoinUl heightSize={heightSize - 140}>
        {/* <li class="sc-dvQaRk fwFfgc">
          <button class="sc-TBWPX eRTGYL">
            <i title="도넛코인 로고" class="sc-jIkXHa DONUT">
              <img src={DncLogo} width='40px' height='20px'></img>
            </i>
            <div class="sc-ZOtfp ifVpiR">
              <strong class="sc-jOxtWs fRnura">도넛코인</strong>
              <span class="sc-hmjpVf rWtdp">DNC/KRW</span>
              </div>
              <strong class="sc-eLwHnm jklrYb">50,080,000</strong>
            <div class="sc-bTfYFJ eaJCMQ">
              <span class="sc-kHOZwM czmvwe">2.96%</span>
              <span class="sc-hOGkXu gZdwXs">1,440,000</span>
            </div>
              <span class="sc-dtMgUX QzAZf">491,769 백만</span>
          </button>
        </li> */}

        {isMarketNamesLoading || isInitCandleLoading ? (
          <Loading center={false} />
        ) : (

          DNCsortedMarketNames.map((marketName) => {
            const splitedName = marketName.split("-");
            const enCoinName = splitedName[1] + "/" + splitedName[0];
            // console.log(marketName)
            const changePrice24Hour =
              DNClatestCoinData[marketName].changePrice24Hour;
            const changeRate24Hour =
              DNClatestCoinData[marketName].changeRate24Hour;
            const tradePrice24Hour =
              DNClatestCoinData[marketName].tradePrice24Hour;
            const price =
              DNClatestCoinData[marketName].price;
            // const isTraded = latestCoinData[marketName].isTraded;

            const fontColor =
              +changePrice24Hour > 0
                ? theme.strongRed
                : +changePrice24Hour < 0
                  ? theme.strongBlue
                  : "black";

            return (
              <CoinListItem
                theme={theme}
                marketName={marketName}
                selectedMarket={selectedMarket}
                // selectedMarket={selectedMarket=="KRW-DNC"?"KRW-BTC":selectedMarket}
                coinName={DNCmarketNames[marketName].korean}
                enCoinName={enCoinName}
                fontColor={fontColor}
                price={price}
                changeRate24Hour={changeRate24Hour + "%"}
                changePrice24Hour={changePrice24Hour}
                tradePrice24Hour={tradePrice24Hour}
                // isTraded={isTraded}
                key={`coinList-${marketName}`}
              />
            );
          })
        )}
      </St.CoinUl>
    </St.CoinListContainer>
  );
};


export default withLatestCoinData()(
  withMarketNames()(
    withSelectedOption()(
      withLoadingData()(withThemeData()(React.memo(CoinList)))
    )
  )
);
