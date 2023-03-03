import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

function Public() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return router;
}

export default Public;
