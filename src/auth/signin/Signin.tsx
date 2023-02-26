import { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Signin() {
  const [validated, setValidated] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const email = emailRef.current?.value!;
    const password = passwordRef.current?.value!;

    handleEmail(email);
    handlePassword(password);

    if (!email || !password) return;

    await signingIn(email, password);
  };

  const handleEmail = (email: string) => {
    if (validEmail(email)) setErrorEmail("");
  };

  const handlePassword = (password: string) => {
    if (validPassword(password)) setErrorPassword("");
  };

  const validEmail = (email: string) => {
    if (email.length != 0) return true;

    setErrorEmail("Please enter your email address.");
    return false;
  };

  const validPassword = (password: string) => {
    if (password.length != 0) return true;

    setErrorPassword("Please enter your password.");
    return false;
  };

  const signingIn = async (email: string, password: string) => {
    const response: any = await sendSigninRequest(email, password);

    handleResponse(response);
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

  const handleResponse = (response: any) => {
    if (response.success) {
      resetState();
      return;
    }

    const errEmail: Record<string, any> = response.errors["email"];
    const errPassword: Record<string, any> = response.errors["password"];

    if (errEmail != undefined) {
      const errors: Array<string> = Object.values(errEmail);
      setErrorEmail(errors[0]);
    } else if (errPassword != undefined) {
      const errors: Array<string> = Object.values(errPassword);
      setErrorPassword(errors[0]);
    }
  };

  const resetState = () => {
    setValidated(false);
    setErrorEmail("");
    setErrorPassword("");

    emailRef.current!.value = "";
    passwordRef.current!.value = "";
  };

  return (
    <>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Card.Title className="fs-2 fw-semi-bold text-center">
            Sign In
          </Card.Title>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              isInvalid={validated && errorEmail != ""}
              ref={emailRef}
            />
            <Form.Control.Feedback type="invalid">
              {errorEmail}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              ref={passwordRef}
              isInvalid={validated && errorPassword != ""}
            />
            <Form.Control.Feedback type="invalid">
              {errorPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button as="button" type="submit" variant="primary" className="w-100">
            Sign In
          </Button>
        </Form>
      </Card.Body>
    </>
  );
}

export default Signin;
