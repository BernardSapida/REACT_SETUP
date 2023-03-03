import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";

function User() {
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
          path: "test",
          element: <Test />,
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

export default User;
