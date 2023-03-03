import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Signin, { loader as signinLoader } from "../pages/Signin";
import Signup from "../pages/Signup";
import Error from "../pages/Error";

function Public() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signin",
          element: <Signin />,
          loader: signinLoader,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return router;
}

export default Public;
