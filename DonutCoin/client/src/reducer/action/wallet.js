import axios from 'axios';
import {

  GET_WALLET,
  BUY_WALLET,
  SELL_WALLET,

} from './types';


// Wallet 구현
export function getMyWallet({ userFrom: userFrom, coinName: coinName }) {
  const request = axios
    .post('/api/myWallet', { userFrom: userFrom, coinName: coinName })
    .then(response => response.data);

  return {
    type: GET_WALLET,
    payload: request,
  };
}
// 매수
export function buyCoin({ userFrom: userFrom, coinName: coinName }) {
  const request = axios
    .post('/api/myWallet/buy', { userFrom: userFrom, coinName: coinName })
    .then(response => response.data);

  return {
    type: BUY_WALLET,
    payload: request,
  };
}
//매도
export function sellCoin({ userFrom: userFrom, coinName: coinName }) {
  const request = axios
    .post('/api/myWallet/sell', { userFrom: userFrom })
    .then(response => response.data);

  return {
    type: SELL_WALLET,
    payload: request,
  };
}
