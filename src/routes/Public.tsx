import { Routes, Route } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

function Public() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route
          path="/signin"
          element={<Signin />}
          loader={() => {
            return `Test: Showed`;
          }}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Public;
