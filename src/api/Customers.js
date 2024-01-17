import React from 'react'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'



// TODO throw jwts in auth header of all requests except reg


const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "ngrok-skip-browser-warner": "true" },
});

export async function getCustomer(username) {
  const res = await api.get(`/customers/${username}`);
  return res.data;
}

export async function addCustomer(customer) {
  const res = await api.post("/registration", customer);
  return res;
}

export async function updatePurchases(newPurchases) {
  const res = await api.put(`/customers/me`, newPurchases);
  return res.data;
}

export async function loginAndAskForJWT(username, password) {
  let response = await fetch('http://localhost:8080/verification', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
      throw new Error('Invalid credentials');
  }
  // Receive and store the JWT token
  return await response.json();
}

// generalized request
export async function request(method, url, data) {
  return axios({
    method: method,
    url:url,
    data: data
  });
};

export default api;