// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import * as Hangul from "hangul-js";
// import { choHangul } from "../Lib/utils";

// const withMarketNames = () => (OriginalComponent) => (props) => {
//   const marketNames = useSelector((state) => state.Coin.marketNames.data); // 코인 마켓 이름들(객체)
//   let marketNamesArr = Object.keys(marketNames); // 코인 마켓 이름 배열화

//   const coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
//   const coinSearchInputData = useSelector((state) => state.Coin.searchCoin); // 검색한 코인 이름

//   const [DNCmarketNames, setDNCmarketNames] = useState();
//   let [DNCmarketNamesArr, setDNCmarketNamesArr] = useState();
//   const [DNCcoinListDatas, setDNCcoinListDatas] = useState();
//   const DNCname = { 'KRW-DNC': { korean: '도넛코인', english: 'Donutcoin' } }


//   console.log(Object.keys(coinListDatas).length)
//   // 데이터 받는 데 성공하면 필터링 및 정렬한다
//   if (Object.keys(coinListDatas).length > 0) {

//     useEffect(() => {
//       setDNCmarketNames(Object.assign(DNCname, marketNames))
//       let BTCdata = { 'KRW-DNC': coinListDatas['KRW-BTC'] }
//       setDNCcoinListDatas(Object.assign(BTCdata, coinListDatas))
//       setDNCmarketNamesArr(marketNamesArr)
//       console.log(DNCmarketNames)
//       console.log(DNCcoinListDatas)



//     }, [coinListDatas])
//     // 검색 기준 필터링
//     console.log(DNCmarketNames)
//     DNCmarketNamesArr = DNCmarketNamesArr.filter(
//       (coin) =>
//         // 영어 검색
//         DNCmarketNames[coin].english
//           .toLowerCase()
//           .includes(coinSearchInputData.toLowerCase()) ||
//         // 코인 심볼 검색
//         coin
//           .split("-")[1]
//           .toLowerCase()
//           .includes(coinSearchInputData.toLowerCase()) ||
//         // 한글 검색
//         Hangul.disassembleToString(DNCmarketNames[coin].korean).includes(
//           Hangul.disassembleToString(coinSearchInputData)
//         ) ||
//         // 초성 검색

//         choHangul(DNCmarketNames[coin].korean).includes(coinSearchInputData)
//     );

//     // 정렬
//     DNCmarketNamesArr = DNCmarketNamesArr.sort((coin1, coin2) => {

//       return (

//         +DNCcoinListDatas[coin2].tradePrice24Hour -
//         +DNCcoinListDatas[coin1].tradePrice24Hour
//       );
//     });
//   }
//   return (
//     <OriginalComponent
//       {...props}
//       marketNames={DNCmarketNames}
//       sortedMarketNames={DNCmarketNamesArr}
//     />
//   );
// };

// export default withMarketNames;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Hangul from "hangul-js";
import { choHangul } from "../lib/utils";

const withMarketNames = () => (OriginalComponent) => (props) => {
  const marketNames = useSelector((state) => state.Coin.marketNames.data); // 코인 마켓 이름들(객체)
  let marketNamesArr = Object.keys(marketNames); // 코인 마켓 이름 배열화

  const coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
  const coinSearchInputData = useSelector((state) => state.Coin.searchCoin); // 검색한 코인 이름

  // console.log("2 : ", marketNames)
  // console.log("3 : ", coinListDatas)

  const [DNCmarketNames, setDNCmarketNames] = useState();
  let [DNCmarketNamesArr, setDNCmarketNamesArr] = useState();
  const [DNCcoinListDatas, setDNCcoinListDatas] = useState();
  const DNCname = { 'KRW-DNC': { korean: '도넛코인', english: 'Donutcoin' } }

  useEffect(() => {
    setDNCmarketNames(Object.assign(marketNames, DNCname))
    setDNCmarketNamesArr([...marketNamesArr])


    // console.log("DNCmarketNamesArr : ", DNCmarketNamesArr)

    // console.log("4 : ", DNCmarketNames)
    // console.log(" : ", Object.keys(DNCcoinListDatas))
    // console.log(DNCcoinListDatas)

    // console.log("6 : ", DNCmarketNamesArr)
    let BTCdata = { 'KRW-DNC': coinListDatas['KRW-BTC'] }
    setDNCcoinListDatas(Object.assign(coinListDatas, BTCdata))

  }, [marketNames, coinListDatas, coinSearchInputData])


  // console.log("3 : ", DNCmarketNamesArr)
  // console.log("2 : ", marketNamesArr)

  // 데이터 받는 데 성공하면 필터링 및 정렬한다
  if (DNCmarketNames != null && Object.keys(DNCmarketNames).length > 15 && Object.keys(DNCcoinListDatas).length > 15) {
    // console.log("123 : ", DNCmarketNamesArr)
    // console.log(DNCmarketNames)
    // console.log("keys : " , Object.keys(DNCmarketNames))
    // 검색 기준 필터링

    DNCmarketNamesArr = DNCmarketNamesArr.filter(
      (coin) =>
        // 영어 검색
        DNCmarketNames[coin].english
          .toLowerCase()
          .includes(coinSearchInputData.toLowerCase()) ||
        // 코인 심볼 검색
        coin
          .split("-")[1]
          .toLowerCase()
          .includes(coinSearchInputData.toLowerCase()) ||
        // 한글 검색
        Hangul.disassembleToString(DNCmarketNames[coin].korean).includes(
          Hangul.disassembleToString(coinSearchInputData)
        ) ||
        // 초성 검색

        choHangul(DNCmarketNames[coin].korean).includes(coinSearchInputData)
    );
    // console.log("1 : ", DNCmarketNamesArr)
    // 정렬
    DNCmarketNamesArr = DNCmarketNamesArr.sort((coin1, coin2) => {
      if (DNCcoinListDatas[coin2].tradePrice24Hour != null && (coin1 != "KRW-CELO" || coin2 != "KRW-CELO")) {
        // console.log(coin2)
        // console.log("DNCcoinListDatas[coin2].tradePrice24Hour : ", DNCcoinListDatas[coin2].tradePrice24Hour)
        // console.log(coin1)
        // console.log("DNCcoinListDatas[coin2].tradePrice24Hour : ", DNCcoinListDatas[coin1].tradePrice24Hour)

        return (
          +DNCcoinListDatas[coin2]?.tradePrice24Hour -
          +DNCcoinListDatas[coin1]?.tradePrice24Hour
        );
      } else {
        console.log('failed')
      }
    });
  }
  // console.log("0 : ", DNCmarketNamesArr)
  return (
    <OriginalComponent
      {...props}
      marketNames={DNCmarketNames}
      sortedMarketNames={DNCmarketNamesArr}
    />
  );
};

export default withMarketNames;
