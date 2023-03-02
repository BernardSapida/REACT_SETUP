import { useState, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import css from "../../App.module.css";

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

const confirmPasswordReducer = (state: any, action: Action) => {
  if (action.type === "input") {
    return { value: action.value, valid: action.valid, error: action.error };
  }

  if (action.type === "validation") {
    return { value: action.value, valid: action.valid, error: action.error };
  }

  return { value: "", valid: false, error: "" };
};

function Signup() {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
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
  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    {
      value: "",
      valid: false,
      error: "",
    }
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);
    setValidated(true);

    const email: string = emailState.value;
    const password: string = passwordState.value;
    const confirmPassword: string = confirmPasswordState.value;

    handleEmail(email);
    handlePassword(password);
    handleConfirmPassword(confirmPassword);

    if (!email || !password || !confirmPassword) return setLoading(false);

    await signingUp(email, password, confirmPassword);
  };

  const emailChangeHandler = useCallback(
    (event: any) => {
      const email = event.target.value;
      dispatchEmail({ type: "input", value: email, valid: false, error: "" });
    },
    [emailState]
  );

  const passwordChangeHandler = useCallback(
    (event: any) => {
      const password = event.target.value;
      dispatchPassword({
        type: "input",
        value: password,
        valid: false,
        error: "",
      });
    },
    [passwordState]
  );

  const confirmPasswordChangeHandler = useCallback(
    (event: any) => {
      const confirmPassword = event.target.value;

      dispatchConfirmPassword({
        type: "input",
        value: confirmPassword,
        valid: false,
        error: "",
      });
    },
    [confirmPasswordState]
  );

  const handleEmail = (email: string) => {
    const result = validateEmail(email);
    const errorMessage =
      result.message.charAt(0).toUpperCase() + result.message.slice(1);

    dispatchEmail({
      type: "validation",
      value: email,
      valid: result.success,
      error: errorMessage,
    });
  };

  const handlePassword = (password: string) => {
    const result = validPassword(password);
    const errorMessage =
      result.message.charAt(0).toUpperCase() + result.message.slice(1);

    dispatchPassword({
      type: "validation",
      value: password,
      valid: result.success,
      error: errorMessage,
    });
  };

  const handleConfirmPassword = (confirmPassword: string) => {
    const result = validConfirmPassword(passwordState.value, confirmPassword);
    const errorMessage =
      result.message.charAt(0).toUpperCase() + result.message.slice(1);

    dispatchConfirmPassword({
      type: "validation",
      value: confirmPassword,
      valid: result.success,
      error: errorMessage,
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

  const validConfirmPassword = (password: string, confirmPassword: string) => {
    if (password != confirmPassword) {
      return {
        success: false,
        message: "Password and confirm password didn't matched.",
      };
    }

    if (confirmPassword.length != 0) return { success: true, message: "" };

    return {
      success: false,
      message: "Please enter your confirm password.",
    };
  };

  const signingUp = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const response: any = await sendSignupRequest(
      email,
      password,
      confirmPassword
    );

    handleResponse(email, password, confirmPassword, response);
    setLoading(false);
  };

  const sendSignupRequest = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const response = await fetch(`https://denover.deno.dev/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    const data = await response.json();

    return data;
  };

  const handleResponse = (
    email: string,
    password: string,
    confirmPassword: string,
    response: any
  ) => {
    if (response.success) {
      resetState();
      return;
    }

    const errEmail: Record<string, any> = response.errors["email"];
    const errPassword: Record<string, any> = response.errors["password"];
    const errConfirmPassword: Record<string, any> =
      response.errors["confirmPassword"];

    if (errEmail != undefined) {
      const errors: Array<string> = Object.values(errEmail);
      const errorMessage =
        errors[0].charAt(0).toUpperCase() + errors[0].slice(1);

      dispatchEmail({
        type: "validation",
        value: email,
        valid: false,
        error: errorMessage,
      });
    } else if (errPassword != undefined) {
      const errors: Array<string> = Object.values(errPassword);
      const errorMessage =
        errors[0].charAt(0).toUpperCase() + errors[0].slice(1);

      dispatchPassword({
        type: "validation",
        value: password,
        valid: false,
        error: errorMessage,
      });
    } else if (errConfirmPassword != undefined) {
      const errors: Array<string> = Object.values(errConfirmPassword);
      const errorMessage =
        errors[0].charAt(0).toUpperCase() + errors[0].slice(1);

      dispatchConfirmPassword({
        type: "validation",
        value: confirmPassword,
        valid: false,
        error: errorMessage,
      });
    }
  };

  const resetState = () => {
    setValidated(false);
    dispatchEmail({ value: "", valid: false, error: "" });
    dispatchPassword({ value: "", valid: false, error: "" });
    dispatchConfirmPassword({
      value: "",
      valid: false,
      error: "",
    });
  };

  return (
    <section className={`container my-5 ${css["app-component"]}`}>
      <Card className={`${css["signin-container"]}`} border="light">
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Card.Title className="fs-2 fw-semi-bold text-center">
              Sign Up
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

            <Input
              label={"Confirm Password"}
              id={"confirmPassword"}
              type={"password"}
              placeholder={"Type confirm password"}
              value={confirmPasswordState.value}
              handler={confirmPasswordChangeHandler}
              isInvalid={validated && confirmPasswordState.error.length > 0}
              error={confirmPasswordState.error}
            />

            <Button
              as="button"
              type="submit"
              variant="primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2"
            >
              {loading && (
                <Spinner
                  animation="border"
                  variant="light"
                  className="height-50"
                  size="sm"
                />
              )}
              {loading ? "Creating an account" : "Create Account"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Signup;
