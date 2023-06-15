import Verification from "./components/Verification.js";

export default function App() {

  let elisa = {
    userName: "elisa",
    password: "elisa123",
  }

  // add someone
  fetch("http://localhost:8080/customers", {
      method: "post",
      body: JSON.stringify(elisa)
  }).then(res => res.json()).then(res => console.log(res)); 

  // get all
  fetch("http://localhost:8080/customers", {
      method: "get"
      // body: JSON.stringify(ob)
  }).then(res => res.json()).then(res => console.log(res)); 

  return (  
    <div className="App">
      <Verification />
    </div>
  );
} 
