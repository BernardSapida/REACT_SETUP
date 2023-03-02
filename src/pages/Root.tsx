import { Outlet } from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";

function Root() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Root;
