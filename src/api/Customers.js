import React from 'react'
import axios from "axios";
import { getJWTFromCookie } from '../App';

axios.defaults.baseURL = 'http://localhost:8080'

// TODO not even using axios?
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

// TODO literally duplicate fucntions

export async function loginAndAskForJWT(username, password) {
  // TODO make const PORT and APIURL
  let response = await fetch('http://localhost:8080/verification', { 
    method: 'POST',
    mode: "cors",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
      throw new Error('Invalid credentials');
  }
  return await response.json(); 
}

export async function registerUser(username, password) {
  let response = await fetch('http://localhost:8080/registration', { 
    method: 'POST',
    mode: "cors",  
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json(); 
}

export async function getMyCustomerObject() {
  let response = await fetch('http://localhost:8080/customers/me', {
    method: 'GET',
    mode: "cors",  
    headers: {
      "Authorization": 'Bearer ' + getJWTFromCookie(),
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export async function updatePurchases(newPurchases) {
  let response = await fetch('http://localhost:8080/customers/me/purchases', {
    method: 'POST',
    mode: "cors",  
    headers: {
      "Authorization": 'Bearer ' + getJWTFromCookie(),
      'Content-Type': 'application/json'
    },
    body: newPurchases
  });
  return await response.json();
} 

// generalized request
// TODO use just this in all requests
export async function request(method, url, data) {
  return axios({
    method: method,
    url:url,
    data: data
  });
};

// export default api;