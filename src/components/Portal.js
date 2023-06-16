import React from "react";
import { useLoaderData } from "react-router-dom";
import { getCustomer } from "../api/Customers";

export const loader = ({ params }) => getCustomer(params.username);

export default function Portal() {
  const customer = useLoaderData()
  return (
    <div>
      Portal for {customer.userName}
      <br />
      <button onClick={() => (window.location.href = "/")}>
        Back to login
      </button>
    </div>
  );
}
