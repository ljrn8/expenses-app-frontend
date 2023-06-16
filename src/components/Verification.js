import React from "react";

function Verification() {
  function handleSubmit(e) {
    console.log(e);
  }
  function handleRegister(e) {
    console.log(e);
  }

  return (
    <div className="Verification">
      <form>
        <label>
          <h1>Log In</h1>
        </label>
        <br />
        <input type="text" placeholder="Username" required />
        <br />
        <input type="text" placeholder="Password" required />
        <hr style={{ width: "100%", marginTop: "7vh" }} />
        <br />
        <input type="submit" onSubmit={handleSubmit} />
        <br />
        <button id="registration-button" onClick={handleRegister}>
          Create an account
        </button>
      </form>
    </div>
  );
}

export default Verification;
