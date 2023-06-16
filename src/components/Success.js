import React from "react";

export default function Success() {
  return (
    <div>
      Registration successful, please return to the verification page and login{" "}
      <br />
      <br />
      <button onClick={() => (window.location.href = "/")}>
        Back to login
      </button>
    </div>
  );
}
