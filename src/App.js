import Verification from "./components/Verification.js";
import { useState, useEffect } from "react";
import api from "./api/axiosConifg";

/** NOTEs
 *  rest api - use href to then update state <- stored in http reques
 */

export default function App() {
  const [customers, setCustomers] = useState();

  async function getCustomers() {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function addCustomer(customer) {
    try {
      const res = await api.post("/customers", customer);
    } catch (e) {
      console.log(e);
    }
  }

  async function getCustomer(userName) {
    try {
      const res = await api.get(`/customers/${userName}`);
      return res.data;
    } catch (e) {
      console.log(e);
      // render a component to say username is taken
    }
  }

  async function updatePurchases(userName, newPurchases) {
    const res = await api.put(`/customers/${userName}`, newPurchases);
    return res.data;
  }

  addCustomer({
    userName: "charllette",
    password: "charllette123",
    purchases: {
      apples: 234,
      bananas: 25,
      oranges: 234,
    },
  });

  getCustomer("charllette").then((customer) => console.log(customer));
  // .catch (error => {}) <- do error checking here

  updatePurchases("charllette", {
    apples: 3,
    bananas: 3,
    oranges: 3,
  }).then((customer) => console.log(customer));

  return (
    <div className="App">
      <Verification />
    </div>
  );
}
