import React from "react";
import { useSelector } from "react-redux";
import * as Hangul from "hangul-js";
import { choHangul } from "../Lib/utils";

const withMarketNames = () => (OriginalComponent) => (props) => {
  const marketNames = useSelector((state) => state.Coin.marketNames.data); // 코인 마켓 이름들(객체)

  const coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
  const coinSearchInputData = useSelector((state) => state.Coin.searchCoin); // 검색한 코인 이름

  let marketNamesArr = Object.keys(marketNames); // 코인 마켓 이름 배열화

  // 데이터 받는 데 성공하면 필터링 및 정렬한다
  if (Object.keys(coinListDatas).length > 25) {
    // 검색 기준 필터링
    marketNamesArr = marketNamesArr.filter(
      (coin) =>{
      
        // 영어 검색
        // console.log(coin)
        marketNames[coin].english
          .toLowerCase()
          .includes(coinSearchInputData.toLowerCase()) ||
        // 코인 심볼 검색
        coin
          .split("-")[1]
          .toLowerCase()
          .includes(coinSearchInputData.toLowerCase()) ||
        // 한글 검색
        Hangul.disassembleToString(marketNames[coin].korean).includes(
          Hangul.disassembleToString(coinSearchInputData)
        ) ||
        // 초성 검색

        choHangul(marketNames[coin].korean).includes(coinSearchInputData)
      });

    // 정렬
    marketNamesArr = marketNamesArr.sort((coin1, coin2) => {
      if (coin1 == 'KRW-DNC') {
        coin1 = 'KRW-ETH'
      }
      if (coin2 == 'KRW-DNC') {
        coin2 = 'KRW-ETH'
      }

        // console.log(coin1)
        // console.log(coin2)
        return (
          
          +coinListDatas[coin2].tradePrice24Hour -
          +coinListDatas[coin1].tradePrice24Hour
        );
    });
  }
  return (
    <OriginalComponent
      {...props}
      marketNames={marketNames}
      sortedMarketNames={marketNamesArr}
    />
  );
};

export default withMarketNames;


// import React from "react";
// import { useSelector } from "react-redux";
// import * as Hangul from "hangul-js";
// import { choHangul } from "../Lib/utils";
// import { scaleDivergingPow } from "d3";

// function wait() {
//   setTimeout(() => 3000)
// }
// const withMarketNames = () => (OriginalComponent) => (props) => {
//   let marketNames = useSelector((state) => state.Coin.marketNames.data); // 코인 마켓 이름들(객체)
//   // console.log(marketNames)

//   let coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
//   // console.log("coinListDatas : " + Object.keys(coinListDatas));
//   // console.log(coinListDatas)
  
//   let donutCoinData = coinListDatas['KRW-BTC']
//   // console.log(donutCoinData)
//   let newcoinListDatas = Object.assign({ 'KRW-DNC': donutCoinData }, coinListDatas) //도넛코인 data 추가
//   // console.log(newcoinListDatas)
//   const coinSearchInputData = useSelector((state) => state.Coin.searchCoin); // 검색한 코인 이름
//   // 도넛코인 list에 추가
//   let newmarketNames = Object.assign({ 'KRW-DNC': { korean: "도넛코인", english: "Donut" } }, marketNames)
  
//   let marketNamesArr = Object.keys(newmarketNames); // 코인 마켓 이름 배열화

//   // console.log('sorted ' + marketNamesArr)
//   // 데이터 받는 데 성공하면 필터링 및 정렬한다
//   if (Object.keys(newcoinListDatas).length > 25) {
//     // 검색 기준 필터링
//     marketNamesArr = marketNamesArr.filter(
//       (coin) =>{
//         // console.log(coin)
        
//         // 영어 검색
//         newmarketNames[coin].english
//           .toLowerCase()
//           .includes(coinSearchInputData.toLowerCase()) ||
//         // 코인 심볼 검색
//         coin
//           .split("-")[1]
//           .toLowerCase()
//           .includes(coinSearchInputData.toLowerCase()) ||
//         // 한글 검색
//         Hangul.disassembleToString(marketNames[coin].korean).includes(
//           Hangul.disassembleToString(coinSearchInputData)
//         ) ||
//         // 초성 검색
//         choHangul(newmarketNames[coin].korean).includes(coinSearchInputData)

//     });

//     // 정렬
//     marketNamesArr = marketNamesArr.sort((coin1, coin2) => {
//       return (
//         +newcoinListDatas[coin2].tradePrice24Hour -
//         +newcoinListDatas[coin1].tradePrice24Hour
//       );
//     });
//   }
//   return (
//     <OriginalComponent
//       {...props}
//       marketNames={newmarketNames}
//       sortedMarketNames={marketNamesArr}
//     />
//   );
// };

// export default withMarketNames;
