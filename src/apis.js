import axios from 'axios';
function fetchRequest(url, method = 'GET', body = null, headers = null) {
  let options = {
    method,
    headers: {
      'Content-Type':'application/json',
      ...headers
    },
    withCredentials: 'same-origin',
    body: body?JSON.stringify(body):null
  }
  return fetch(url, options).then(res => {
    console.log(res.headers);
    return res.json();
  })
}
function request(url, method = 'GET', body = null, headers = null){
  let options = {
    method,
    headers: {
      'Content-Type':'application/json',
      ...headers
    },
    withCredentials: true,
    data: body
  }
  return axios(url, options).then(res => new Promise(r => {
    console.log(res.headers)
    r(res);
  }));
}

export default request;
export function handleError(err) {
  console.error(err);
  this.$router.push('/');
}
