import React, { useState, useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";

const AuthContext = React.createContext({
  signedIn: false,
  signin: () => {},
  signout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [isSignedIn, setSignedIn] = useState(false);
  const token = localStorage.getItem("token");

  const signinHandler = () => setSignedIn(true);
  const signoutHandler = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
  };

  useEffect(() => {
    if (!token) return;

    const decoded: any = decodeToken(token);
    const tokenExpired = isExpired(token);

    if (tokenExpired) {
      signoutHandler();
      return;
    }

    signinHandler();

    const expirationInSeconds = decoded.exp - new Date().getTime() / 1000;
    const sessionTime = setTimeout(() => {
      signoutHandler();
    }, expirationInSeconds * 1000);

    return () => {
      clearTimeout(sessionTime);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSignedIn,
        signin: signinHandler,
        signout: signoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
