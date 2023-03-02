import { useRoutes } from "react-router-dom";

import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/Signup";
import Home from "../pages/Home";

const Router = () => {
  const router = useRoutes([
    {
      path: "/",
      index: true,
      element: <Home />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return router;
};

export default Router;
