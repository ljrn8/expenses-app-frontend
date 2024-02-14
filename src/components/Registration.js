import React from "react";
import { useState } from "react";
import { registerUser } from "../api/Customers";
import ProcessingButton from "./ProcessingButton";
import LoadingCircle from "./LoadingCircle";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [denied, setDenied] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    registerUser(username, password)
      .then((res) => {
        if (res.status === 409) {
          setDenied("this username is taken");
        } else if (res.status === 200) {
          window.location.href = "/success";
        } else {
          throw new Error("got unexpeced status code for registration: ", res.status);
        }
      })
    setLoading(false);
  }

  return (
    <div className="Registration">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>· • Registration • ·</h1> <br />
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
        <ProcessingButton 
          loading={loading} 
          notification={"making account"}
          text={"register account"}
        />
        <br />
        <button
          id="registration-button"
          onClick={(e) => {
            e.preventDefault(); 
            window.location.href = "/"}}
        >
          Back to login
        </button>
        {loading && <LoadingCircle />}
      </form>
    </div>
  );
}
