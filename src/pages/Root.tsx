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
