import Public from "./Public";
import User from "./User";

const Router = (isAuthenticated: boolean) => {
  return isAuthenticated ? User() : Public();
};

export default Router;
