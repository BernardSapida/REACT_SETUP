import { useState, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import css from "../App.module.css";

import Input from "../components/input/Input";
import { authActions } from "../store/slices/authSlice";
import { useNavigate, useLoaderData } from "react-router-dom";

interface Action {
  type?: string;
  value: string;
  valid: boolean;
  error: string;
}

export const loader = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response;
  } catch (error: any) {
    throw new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};

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
  const loader = useLoaderData();
  console.log(loader);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);
    setValidated(true);

    const email: string = emailState.value;
    const password: string = passwordState.value;

    handleEmail(email);
    handlePassword(password);

    if (!email || !password) return setLoading(false);

    await signingIn(email, password);
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
    setLoading(false);
  };

  const sendSigninRequest = async (email: string, password: string) => {
    const response = await fetch(`https://denover.deno.dev/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: 'Bearer ' + token
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
      dispatch(authActions.signin());
      navigate("/");
      return;
    }

    const errEmail: Record<string, any> = response.errors["email"];
    const errPassword: Record<string, any> = response.errors["password"];

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
    <article className={`mx-auto ${css["app-component"]}`}>
      <Card className={`${css["signin-container"]}`} border="light">
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Card.Title className="fs-2 fw-semi-bold text-center">
              Sign In
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
              {loading ? "Signing In" : "Sign In"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </article>
  );
};

export default Signin;

// Convert all forms to formik
