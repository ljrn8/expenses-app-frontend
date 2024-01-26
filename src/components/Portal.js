import React from "react";
import { useLoaderData } from "react-router-dom";
import { getCustomer, getMyCustomerObject } from "../api/Customers";
import { useState, useEffect } from "react";
import { updatePurchases } from "../api/Customers";
import { isAuthenticated, setJWTToCookie } from "../App";
import ProcessingButton from "./ProcessingButton";
import LoadingCircle from "./LoadingCircle";

// get path parameter from router
export const loader = ({ params }) =>  isAuthenticated() ? getMyCustomerObject() : null;

function kickUser(customer = null) {
  console.log("user kicked ", customer ?? "");
  // setJWTToCookie("");
  // window.location.href = "/";
}



export default function Portal() {

  const [customer, setCustomer] = useState(useLoaderData());

  if (customer == null || !isAuthenticated()) kickUser();

  console.log("started portal with this customer: ", customer);

  const [purchases, setPurchases] = useState({
    apples: 0,
    bananas: 0,
    oranges: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function purchase(item, amount = 1) {
    let temp = purchases[item] + amount;
    if (temp < 0) temp = 0;
    setPurchases({ ...purchases, [item]: temp });
  }

  function itemCounter(item) {
    return (
      <div className="Counter" style={{fontSize: "20px", marginBottom: "1vh"}}>
        <h2 style={{ marginRight: "20px", width: "100px"}}>
          {purchases[item] + emoji[item]}
        </h2>
        <button
          onClick={(e) => purchase(item, 1)}
          style={{ marginRight: "3px"}}
        >
          +
        </button>
        <button onClick={(e) => purchase(item, -1)}>-</button>
      </div>
    );
  }

  function makePurchase() {
    setLoading(true);
    const newPurchases = { ...customer.purchases };
    Object.entries(purchases).forEach(([item, amount]) => {
      newPurchases[item] += amount;
    });

    console.log("putting: ", newPurchases);

    updatePurchases(newPurchases).then(async res => {
      if (res.status === 401) {
        console.log("updateing returned 401, removing jwt and returning to login");
        kickUser(customer)

      } else if (res.status === 200) {
        let body = await res.json();
        console.log(body);
        setCustomer(prevCustomer => ({...prevCustomer, ...body}));
        setLoading(false);
        setMessage("successfully updated purchases ✅");
      
      } else {
        throw new Error("unexpected response code: ", res.status);
      }
    })

    
  }

  let emoji = {
    "apples": "🍎", 
    "bananas": "🍌",
    "oranges": "🍊",
  };

  return (
    <div id="PortalContainer">
      <h1 style={{marginBottom: "1vh"}}> ⋞ Hello {customer.username} ⋟ </h1>
      {message ? <h2 style={{color: "#90EE90"}}>{message}</h2> : <h2>view and make purchases below</h2>}
      <br />


      <hr style={{ width: "100%", marginBottom: "3vh" }} />
      <h3>
        The current purchases for your account are:
        {Object.entries(customer.purchases).map(([item, amount]) => (
          <div key={item} style={{ fontStyle: "revert", fontWeight: "lighter"}}>
            {item + " " + emoji[item]} {amount} <br />
          </div>
        ))}
      </h3>
      <hr style={{ width: "100%", marginTop: "3vh" }} />

      <br />

      <div className="Entries">
        {Object.entries(purchases).map(([item, amount]) => (
          <div key={item}>{itemCounter(item)}</div>
        ))}
      </div>

      <br />

        <ProcessingButton 
          loading={loading} 
          onClick={makePurchase} 
          notification={"Purchasing"} 
          text={"Make Purchase"}
          button={true} />
      
      <br />
      <button onClick={() => (window.location.href = "/")}>
        Back to login
      </button>

      {loading && <LoadingCircle />}
      
    </div>
  );
}
