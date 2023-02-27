import { useEffect, useContext, useState, useReducer } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import AuthContext from "../../store/auth-context";
import Input from "./input/Input";

interface Action {
  type?: string;
  value: string;
  valid: boolean;
  error: string;
}

const emailReducer = (state: any, action: Action) => {
  if (action.type === "input") {
    return { value: action.value, valid: action.valid, error: action.error };
  }

  if (action.type === "validation") {
    return { value: action.value, valid: action.valid, error: action.error };
  }

  return { value: "", valid: false, error: "" };
};

const passwordReducer = (state: any, action: Action) => {
  if (action.type === "input") {
    return { value: action.value, valid: action.valid, error: action.error };
  }

  if (action.type === "validation") {
    return { value: action.value, valid: action.valid, error: action.error };
  }

  return { value: "", valid: false, error: "" };
};

const Signin = () => {
  const context = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    valid: false,
    error: "",
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    valid: false,
    error: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const email: string = emailState.value;
    const password: string = passwordState.value;

    handleEmail(email);
    handlePassword(password);

    if (!email || !password) return;

    await signingIn(email, password);
  };

  const emailChangeHandler = (event: any) => {
    const email = event.target.value;
    dispatchEmail({ type: "input", value: email, valid: false, error: "" });
  };

  const passwordChangeHandler = (event: any) => {
    const password = event.target.value;
    dispatchPassword({
      type: "input",
      value: password,
      valid: false,
      error: "",
    });
  };

  const handleEmail = (email: string) => {
    const result = validateEmail(email);

    dispatchEmail({
      type: "validation",
      value: email,
      valid: result.success,
      error: result.message,
    });
  };

  const handlePassword = (password: string) => {
    const result = validPassword(password);

    dispatchPassword({
      type: "validation",
      value: password,
      valid: result.success,
      error: result.message,
    });
  };

  const validateEmail = (email: string) => {
    if (email.length != 0) return { success: true, message: "" };

    return {
      success: false,
      message: "Please enter your email address.",
    };
  };

  const validPassword = (password: string) => {
    if (password.length != 0) return { success: true, message: "" };

    return {
      success: false,
      message: "Please enter your password.",
    };
  };

  const signingIn = async (email: string, password: string) => {
    const response: any = await sendSigninRequest(email, password);

    handleResponse(email, password, response);
  };

  const sendSigninRequest = async (email: string, password: string) => {
    const response = await fetch(`https://denover.deno.dev/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    return data;
  };

  const handleResponse = (email: string, password: string, response: any) => {
    if (response.success) {
      resetState();
      storeToken(response.authToken);
      context.signin();
      return;
    }

    const errEmail: Record<string, any> = response.errors["email"];
    const errPassword: Record<string, any> = response.errors["password"];

    if (errEmail != undefined) {
      const errors: Array<string> = Object.values(errEmail);

      dispatchEmail({
        type: "validation",
        value: email,
        valid: false,
        error: errors[0],
      });
    } else if (errPassword != undefined) {
      const errors: Array<string> = Object.values(errPassword);

      dispatchPassword({
        type: "validation",
        value: password,
        valid: false,
        error: errors[0],
      });
    }
  };

  const storeToken = (token: string) => {
    // useEffect => set localStorage token then if the dependency is changed (login/logout) then it will remove the token from localStorage
    localStorage.setItem("token", token);
  };

  const resetState = () => {
    setValidated(false);
    dispatchEmail({ value: "", valid: false, error: "" });
    dispatchPassword({ value: "", valid: false, error: "" });
  };

  return (
    <>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Card.Title className="fs-2 fw-semi-bold text-center">
            Sign In {context.signedIn.toString()}
          </Card.Title>

          <Input
            label={"Email Address"}
            id={"email"}
            type={"email"}
            placeholder={"Type email address"}
            value={emailState.value}
            handler={emailChangeHandler}
            isInvalid={validated && emailState.error.length > 0}
            error={emailState.error}
          />

          <Input
            label={"Password"}
            id={"password"}
            type={"password"}
            placeholder={"Type password"}
            value={passwordState.value}
            handler={passwordChangeHandler}
            isInvalid={validated && passwordState.error.length > 0}
            error={passwordState.error}
          />

          <Button as="button" type="submit" variant="primary" className="w-100">
            Sign In
          </Button>
        </Form>
      </Card.Body>
    </>
  );
};

export default Signin;
