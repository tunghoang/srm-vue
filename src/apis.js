import axios from 'axios';
import Cookies from 'js-cookie';
import {startLoading, stopLoading} from './loading';

function request(url, method = 'GET', body = null, headers = null, responseType=null){
  let options = {
    method,
    headers: {
      'Content-Type':'application/json',
      'Cache-Control': 'no-cache',
      ...headers
    },
    responseType,
    withCredentials: true,
    data: body
  }
  startLoading();
  return axios(url, options).finally(() => {
    stopLoading();
    console.log('request done');
  }).then(res => new Promise(r => {
    console.log(res.headers)
    r(res);
  }));
}
export function uploadRequest(url, method, body, headers = null) {
  let formData = new FormData();
  for (let key of Object.keys(body)){
    formData.append(key, body[key]);
  }
  let options = {
    method,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache',
      ...headers
    },
    data: formData
  }
  return axios(url, options);
}

export default request;
export function handleError(err) {
  console.error(err);
  if (err.response && err.response.data.message) {
    if (err.response.data.message === 'Not login') {
      Cookies.remove('key');
      Cookies.remove('jwt');
    }
    return err.response.data.message;
  }
  return err.message;
}
