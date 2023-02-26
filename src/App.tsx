import { useState } from "react";
import Signin from "./auth/signin/Signin";

import Card from "react-bootstrap/Card";

import css from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <section className={`container my-5 ${css["app-component"]}`}>
        <Card className={`${css["signin-container"]}`} border="light">
          <Signin />
        </Card>
      </section>
    </div>
  );
}

export default App;
