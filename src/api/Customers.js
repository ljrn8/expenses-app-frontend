import React from 'react'
import axios from "axios";
import { getJWTFromCookie, isAuthenticated } from '../App';

axios.defaults.baseURL = 'http://localhost:8080'

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "ngrok-skip-browser-warner": "true" },
});

// export async function getCustomer(username) {
//   const res = await api.get(`/customers/${username}`);
//   return res.data;
// }

// export async function addCustomer(customer) {
//   const res = await api.post("/registration", customer);
//   return res;
// }

// export async function updatePurchases(newPurchases) {
//   const res = await api.put(`/customers/me`, newPurchases);
//   return res.data;
// }

const PORT = '8080'
const BASE_URI = 'http://localhost:' + PORT

export async function loginAndAskForJWT(username, password) {
  let response = request('POST', '/verification', JSON.stringify({ username, password}));
  return await response;
}

export async function registerUser(username, password) {
  return await request('POST', '/register', JSON.stringify({ username, password}));
}

export async function getMyCustomerObject() {
  let response = request('GET', '/customers/me');
  return (await response).json();
}

export async function updatePurchases(newPurchases) {
  return await request('POST', '/customers/me/purchases', newPurchases);
} 

export async function request(method, resource, data = null, mode = 'cors') {
  return await fetch(BASE_URI + resource, {
    method: method,
    mode: mode,  
    headers: {
      "Authorization": isAuthenticated() ? 'Bearer ' + getJWTFromCookie() : "",
      'Content-Type': 'application/json'
    },
    body: data
  })
}

// TODO use axios api instead
export async function axiosRequest(method, url, data) {
  return axios({
    method: method,
    url:url,
    data: data
  });
};

// export default api;