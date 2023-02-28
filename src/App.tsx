import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

import Signin from "./auth/signin/Signin";
import css from "./App.module.css";

const App = () => {
  return (
    <div className="App">
      <section className={`container my-5 ${css["app-component"]}`}>
        <Card className={`${css["signin-container"]}`} border="light">
          <Signin />
        </Card>
      </section>
    </div>
  );
};

export default App;
