import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { authActions } from "../store/slices/authSlice";

const NavigationBar = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.signout());
    navigate("signin");
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Setup</Navbar.Brand>
        </LinkContainer>

        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>

        <Nav className="ms-auto">
          {auth.signedIn ? (
            <>
              <Nav.Link onClick={signout}>Sign Out</Nav.Link>
            </>
          ) : (
            <>
              <LinkContainer to="/signin">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
