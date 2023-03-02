import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { authActions } from "./store/slices/authSlice";
import Router from "./routes/Router";

const App = () => {
  const navigate = useNavigate();
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
      navigate("/signin");
    }, expirationInSeconds * 1000);

    return () => {
      clearTimeout(sessionTime);
    };
  }, [auth.signedIn]);

  return <Router />;
};

export default App;
