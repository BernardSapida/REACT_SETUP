import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./routes/Router";

const App = () => {
  const auth = useSelector((state: any) => state.auth);

  return <RouterProvider router={Router(auth.signedIn)} />;
};

export default App;
