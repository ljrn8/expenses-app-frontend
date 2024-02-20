import React from "react";
import { useState } from "react";
import { loginAndAskForJWT } from "../api/Customers";
import { setJWTToCookie } from "../App";
import LoadingCircle from "./LoadingCircle";
import ProcessingButton from "./ProcessingButton";

export default function Verification() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [denied, setDenied] = useState(null);

  const [loading, setLoading] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    loginAndAskForJWT(username, password).then(async res => {
      if (res.status === 401) {
        console.log("username or password was incorrect: [" + username + " " + password);
        setDenied("username or password was incorrect");
        setLoading(false);

      } else if (res.status !== 200) {
        throw new Error("got unexpected error code from server: ", res);
        
      } else {
        // reading text body is also async
        let jwt = await res.text(); 
        if (jwt.startsWith('Bearer ')) {
          jwt = jwt.slice(7);
          console.log("jwt: " + jwt);

          // const decoded = jwt.verify(token, 'your_secret_key');
          setJWTToCookie(jwt);

          // TODO react change shit
          window.location.href = `/portal/user`;
        }
      }
    });
  }

  return (
    <div className="Verification">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>∾ Log In ∾</h1>
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

        <ProcessingButton loading={loading} notification={"Verifying"} />

        <br />
        
        <button
          id="registration-button"
          onClick={() => (window.location.href = "/registration")}
        >
          Create an account
        </button>
        { loading && <LoadingCircle />}

      </form>
    </div>
  );
}
