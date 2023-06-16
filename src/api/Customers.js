import React from 'react'
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "ngrok-skip-browser-warner": "true" },
});

export async function getCustomer(username) {
  const res = await api.get(`/customers/${username}`);
  return res.data;
}

export async function addCustomer(customer) {
  const res = await api.post("/customers", customer);
  return res;
}

export async function updatePurchases(userName, newPurchases) {
  const res = await api.put(`/customers/${userName}`, newPurchases);
  return res.data;
}

export default api;