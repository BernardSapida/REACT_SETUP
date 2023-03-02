import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";
import { Route, Routes, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { authActions } from "./store/slices/authSlice";

import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Signout from "./pages/signout/Signout";
import Home from "./pages/Home";

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
      navigate("/");
    }, expirationInSeconds * 1000);

    return () => {
      clearTimeout(sessionTime);
    };
  }, [auth.signedIn]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
