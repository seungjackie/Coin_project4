import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from '../action/types';

export function registerUser(dataToSubmit) {
  // axios를 이용해 register 요청을 보내고 response.data를 반환하여 request에 넣어준다.
  const request = axios.post('/api/users/join', dataToSubmit)
  .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  // axios를 이용해 login 요청을 보내고 response.data를 반환하여 request에 넣어준다.
    const request = axios.post('/api/users/login', dataToSubmit)
    .then((response)=> response.data);
    return {
        type : LOGIN_USER,
        payload : request,
    };
}