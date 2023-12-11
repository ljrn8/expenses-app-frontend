import React from "react";
import { useLoaderData } from "react-router-dom";
import { getCustomer } from "../api/Customers";
import { useState, useEffect } from "react";
import { updatePurchases } from "../api/Customers";

// get path parameter from router
export const loader = ({ params }) => getCustomer(params.username);

export default function Portal() {
  const customer = useLoaderData();
  const [purchases, setPurchases] = useState({
    apples: 0,
    bananas: 0,
    oranges: 0,
  });

  function purchase(item, amount = 1) {
    let temp = purchases[item] + amount;
    if (temp < 0) temp = 0;
    setPurchases({ ...purchases, [item]: temp });
  }

  function itemCounter(item) {
    return (
      <div className="Counter">
        <br />
        <h1 style={{ marginRight: "20px" }}>
          {purchases[item]} {item.toUpperCase()}
        </h1>
        <button
          onClick={(e) => purchase(item, 1)}
          style={{ marginRight: "3px" }}
        >
          +
        </button>
        <button onClick={(e) => purchase(item, -1)}>-</button>
      </div>
    );
  }

  function makePurchase() {
    const newPurchases = { ...customer.purchases };
    Object.entries(purchases).forEach(([item, amount]) => {
      newPurchases[item] += amount;
    });

    console.log("putting: ", newPurchases);

    updatePurchases(customer.userName, newPurchases).catch((e) =>
      console.log(
        "something went wrong making the purchase, ",
        purchases,
        "see:",
        e
      )
    );
    // reload the page (is this how you do it?)
    window.location.href = window.location.pathname;
  }

  let emoji = {
    "apples": "🍎", 
    "bananas": "🍌",
    "oranges": "🍊",
  };

  return (
    <div id="Portal-Page">
      <h1>Hello {customer.userName}, view and make purchases below</h1>
      <br />
      <h3>
        The current purchases for your account are:
        {Object.entries(customer.purchases).map(([item, amount]) => (
          <div key={item} style={{ fontStyle: "revert", fontWeight: "lighter"}}>
            {item + " " + emoji[item]}: {amount} <br />
          </div>
        ))}
      </h3>
      <hr />
      <br />
      <div className="Portal">
        {Object.entries(purchases).map(([item, amount]) => (
          <div key={item}>{itemCounter(item)}</div>
        ))}
      </div>
      <button onClick={makePurchase} style={{ marginTop: "15vh" }}>
        Make Purchase
      </button>
      <br />
      <br />
      <button onClick={() => (window.location.href = "/")}>
        Back to login
      </button>
    </div>
  );
}
