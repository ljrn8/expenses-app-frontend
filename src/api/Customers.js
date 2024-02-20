import { getJWTFromCookie, isAuthenticated } from '../App';

// TODO move error handling here

const PORT = '8080'
const BASE_URI = 'http://localhost:' + PORT

export async function loginAndAskForJWT(username, password) {
  return request('POST', '/verification', JSON.stringify({ username, password}));
}

export async function registerUser(username, password) {
  return request('POST', '/register', JSON.stringify({ username, password}));
}

export async function getMyCustomerObject() {
  request('GET', '/customers/me').then(res => res.json()).then(res => {
    if (res == null) {
      throw new Error("Server response body was null");
    } else if (res.purchase == null) {
      throw new Error("Server response body didnt containt purchases object")
    }
    return res;
  })
}

export async function updatePurchases(newPurchases) {
  return request('PUT', '/customers/me/purchases', JSON.stringify(newPurchases));
}

export async function request(method, resource, jwt = getJWTFromCookie(), data = null, mode = 'cors') {
  return fetch(BASE_URI + resource, {
    method: method,
    mode: mode,  
    headers: {
      "Authorization": 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    },
    body: data
  }).catch(e => {
    throw new Error("Server error: ", e);
  });
}
 