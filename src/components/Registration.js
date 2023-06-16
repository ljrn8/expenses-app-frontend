import React from "react";
import { useState } from "react";
import { addCustomer, getCustomer } from "../api/Customers";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [denied, setDenied] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    getCustomer(username)
      .then((customer) => {
        setDenied("this username is taken");
      })
      .catch((e) => {
        // TODO check specific error code / add 'exists' mapping to avoid bad coding
        addCustomer({
          userName: username,
          password: password,
        }).catch((e) => console("something went wrong adding new user: ", e));
        window.location.href = "/success";
      });
  }

  return (
    <div className="Registration">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>Registration</h1> <br />
          set your username and password
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {denied && <div style={{ color: "red" }}>{denied}</div>}
        <hr style={{ width: "100%", marginTop: "7vh" }} />
        <br />
        <input type="submit" />
        <br />
        <button
          id="registration-button"
          onClick={() => (window.location.href = "/")}
        >
          Back to login
        </button>
      </form>
    </div>
  );
}
