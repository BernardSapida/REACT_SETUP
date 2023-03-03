import { Routes, Route } from "react-router-dom";

import Public from "./Public";
import User from "./User";

const Router = (props: any) => {
  return props.signedIn ? <User /> : <Public />;
};

export default Router;
