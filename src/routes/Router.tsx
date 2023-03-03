import { useSelector } from "react-redux";

import Public from "./Public";
import User from "./User";

const Router = (isAuthenticated: boolean) => {
  // const auth = useSelector((state: any) => state.auth);
  // console.log(auth.signedIn);

  return isAuthenticated ? User() : Public();
};

export default Router;
