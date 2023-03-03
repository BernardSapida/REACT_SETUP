import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Error from "../pages/Error";

function User() {
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
          path: "test",
          element: <Test />,
        },
      ],
    },
  ]);

  return router;
}

export default User;
