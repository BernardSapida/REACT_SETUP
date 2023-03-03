import { Routes, Route } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

function User() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default User;
