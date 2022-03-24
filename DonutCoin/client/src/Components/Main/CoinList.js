import React, { Component } from "react";
import styled from "styled-components";
import { searchCoin, startAddMoreCandleData } from "../../Reducer/coinReducer";     //코인정보 가져올 항목
import { useDispatch } from "react-redux";

import CoinListItem from "./CoinListItem";
import Loading from "../Global/Loading";

import withThemeData from "../../Container/withThemeData";
import withSelectedOption from "../../Container/withSelectedOption";
import withMarketNames from "../../Container/withMarketNames";
import withLatestCoinData from "../../Container/withLatestCoinData";
import withLoadingData from "../../Container/withLoadingData";
const DncLogo = require("./favicon3.png")

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

    /* 특정 조건이 true 인 경우만 */
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

  CInput: styled.input`
    width: 100%;
    border: none;
    padding: 20px;
    padding-left: 12px;
    &::placeholder {
      font-size: 0.7rem;
      color: black;
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
    /* 반응형 */
    @media ${({ theme }) => theme.desktop} {
      display: block;
      max-width: 400px;
      height: ${({ heightSize }) => `${heightSize}px`};
    }
  `,
};
  // 
  const CoinList = ({
    //value 
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
    // dispatch() 사용시 reducer 함수를 동작 시킬 수 있다.
    // ex) 데이터 수정
    const dispatch = useDispatch();

    return (
      //isRootURL 루트를 나타내는 디렉토리
      <St.CoinListContainer isRootURL={isRootURL} heightSize={heightSize - 80}>
        <St.HiddenH3>코인 리스트</St.HiddenH3>
        {/* 검색바 박스 */}
        <St.CoinSearchContainer>
          {/* 검색 바  */}
          <St.CInput
            type="search"
            // dispatch 사용 하여 reducer 조정
            // target -> searchcoin 항목들
            onChange={(e) => dispatch(searchCoin(e.target.value))}
            value={searchCoinInput}
            placeholder={"coin search"}
          />
          <St.CoinSearchBtn />
        </St.CoinSearchContainer>


        {/* 항목 제목 */}
        <St.CoinSortContainer>
          <St.CoinSortList width={"50px"} />
          <St.CoinSortList textAlign={"left"}>한글명</St.CoinSortList>
          <St.CoinSortList>현재가</St.CoinSortList>
          <St.CoinSortList>상승률</St.CoinSortList>
          <St.CoinSortList width={"25%"} marginRight={"10px"}>
            거래대금
          </St.CoinSortList>
        </St.CoinSortContainer>
        {/* 항목 나열 */}
        {/* value */}
        <St.CoinUl heightSize={heightSize - 140}>
          <li class="sc-dvQaRk fwFfgc">
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
          </li>

          {/* a || b 어느 하나가 트루인경우 true */}
          {isMarketNamesLoading || isInitCandleLoading ? (
            <Loading center={false} />
          ) : (

            sortedMarketNames.map((marketName) => {
              const splitedName = marketName.split("-");
              const enCoinName = splitedName[1] + "/" + splitedName[0];
              const changePrice24Hour =
                latestCoinData[marketName].changePrice24Hour;
              const changeRate24Hour =
                latestCoinData[marketName].changeRate24Hour;
              const tradePrice24Hour =
                latestCoinData[marketName].tradePrice24Hour;
              const price = latestCoinData[marketName].price;
              // const isTraded = latestCoinData[marketName].isTraded;

              const fontColor =
                +changePrice24Hour > 0
                  ? theme.strongRed
                  : +changePrice24Hour < 0
                    ? theme.strongBlue
                    : "black";
              // 코인 목록
              return (
                <CoinListItem
                  theme={theme}
                  marketName={marketName}
                  selectedMarket={selectedMarket}
                  coinName={marketNames[marketName].korean}
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

// class CoinList extends Component{

//   //검색이 작동하는 방식
//   constructor(){
//     super();

//     this.state={
//       search:null
//     };
//   }

//   //초기에 null설정된 search라는변수 포함되어 결과를 표시
//   searchSpace=(event)=>{
//     let keyword = event.target.value;
//     this.setState({search:keyword})
//   }

//   render(){
//     const styleInfo={
//       paddingRight:'10px'
//     }
//     const elementStyle={
//       border:'solid',
//       borderRadius:'10px',
//       position:'relative',
//       left:'10vh',
//       height:'3vh',
//       width:'20vh',
//       marginTop:'5vh',
//       marginBottom:'10vh'
//     }

//     //this.state.search변수에 있는 키워드를 포함하는지 확인하는지?
//     const items = Information.filter((data)=>{
//       if(this.state.search == null)
//           return data
//       else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.country.toLocaleLowerCase().includes(this.state.search.toLowerCase())){
//           return data
//       }
//     }).map(data => {                       // in-json.js 파일 불러오기
//       return(
//         <div>
//           <ul>                                                    
//             <li style={{position:'relative',left:'10vh'}}>
//               <span style={styleInfo}>{data.name}</span>          
//               <span style={styleInfo}>{data.age}</span>
//               <span style={styleInfo}>{data.country}</span>
//             </li>
//           </ul>
//         </div>
//       )
//     })

//     //검색바
//     return (
//       <div>
//         <input type="text" 
//         placeholder="Enter item to be seaerched" 
//         style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
//         {items}
//       </div>
//     )
//   }
// }
//;

// export default App;