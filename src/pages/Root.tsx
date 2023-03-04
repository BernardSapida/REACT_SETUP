import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

import NavigationBar from "../navigation/NavigationBar";
import { authActions } from "../store/slices/authSlice";

function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const verifyToken = (token: string): Record<string, any> | string => {
    const decoded: Record<string, any> = decodeToken(token)!;
    const tokenExpired = isExpired(token);

    if (!decoded || tokenExpired) return "invalid";

    return decoded;
  };

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    const processedToken: any = verifyToken(token);

    if (processedToken == "invalid") return;

    dispatch(authActions.signin());

    const expirationInSeconds =
      processedToken.exp - new Date().getTime() / 1000;

    const sessionTime = setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(authActions.signout());
      navigate("/signin");
    }, expirationInSeconds * 1000);

    return () => {
      clearTimeout(sessionTime);
    };
  }, [auth.signedIn]);

  return (
    <>
      <NavigationBar />
      <main>
        <section className="container my-5">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default Root;
