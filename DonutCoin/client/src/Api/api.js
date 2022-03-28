import axios from "axios";

// export const coinApi = {
//   getMarketCodes: () => {
//     const marketAPI = axios.get('https://api.upbit.com/v1/market/all?isDetails=false')
//       .then((res) => {
//         let dncData = res.data
//         dncData[282] = { market: 'KRW-DNC', korean_name: "도넛코인", english_name: "Donut" }
//         // console.log(dncData)
//         // console.log(res)
//         const test = {
//           ...res,
//           data: dncData
//         }
//         console.log('>>>>>>>>>>>>>>>>',test)
//         return test;
//       })
//     // console.log(marketAPI)
//     return marketAPI
//   },
//   getInitCanldes: (coins) => {

//     let DNCindex = coins.indexOf('KRW-DNC')
//     coins.splice(DNCindex, 1);
//     console.log(coins)
//     return axios.get(`https://api.upbit.com/v1/ticker?markets=${coins}`)
//   },
//   getInitOrderbooks: (coins) => {
//     // console.log(coins)
//     // let DNCindex = coins.indexOf('KRW-DNC')
//     // coins.splice(DNCindex, 1);
//     return axios.get(`https://api.upbit.com/v1/orderbook?markets=${coins}`)
//   },
export const coinApi = {
  getMarketCodes: () =>
    axios.get("https://api.upbit.com/v1/market/all?isDetails=false"),
  getInitCanldes: (coins) =>
    axios.get(`https://api.upbit.com/v1/ticker?markets=${coins}`),
  getInitOrderbooks: (coins) =>
    axios.get(`https://api.upbit.com/v1/orderbook?markets=${coins}`),
  getOneCoinCandles: ({ coin, timeType, timeCount }) => {
    if (timeType === "minutes")
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
    else
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}?market=${coin}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
  },
  getAdditionalCoinCandles: ({ coin, timeType, timeCount, datetime }) => {
    if (timeType === "minutes")
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&to=${datetime}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
    else
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}?market=${coin}&to=${datetime}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
  },
  getOneCoinTradeLists: (coin) =>
    axios.get(`https://api.upbit.com/v1/trades/ticks?market=${coin}&count=50`),
};
