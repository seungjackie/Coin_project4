import {
  GET_WALLET,
  BUY_WALLET,
  SELL_WALLET,
} from '../action/types';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_WALLET:
      return { ...state, wallet: action.payload };
    case BUY_WALLET:
      return { ...state, buy: action.payload };
    case SELL_WALLET:
      return { ...state, sell: action.payload };
    default:
      return state;
  }
}
