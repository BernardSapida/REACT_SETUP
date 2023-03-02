import { useRoutes, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { authActions } from "../store/slices/authSlice";
import { useSelector } from "react-redux";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

const Router = () => {
  const auth = useSelector((state: any) => state.auth);

  const Public = (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

  const User = (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

  let routes: any = Public;

  useEffect(() => {
    if (auth.signedIn) routes = User;
    else routes = Public;
  }, [auth.signedIn]);

  return routes;
};

export default Router;
