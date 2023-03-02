import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";

import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import css from "./App.module.css";

import Signin from "./auth/signin/Signin";
import { authActions } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const decoded: Record<string, any> = decodeToken(token)!;
    const tokenExpired = isExpired(token);

    if (!decoded || tokenExpired) return;

    dispatch(authActions.signin());

    const expirationInSeconds = decoded.exp - new Date().getTime() / 1000;
    const sessionTime = setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(authActions.signout());
    }, expirationInSeconds * 1000);

    return () => clearTimeout(sessionTime);
  }, []);

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
