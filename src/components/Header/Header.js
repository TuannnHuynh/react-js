import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logoReact from "../../assets/images/logo-react.png";
import { handleLogoutRedux } from "../../redux/actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };
  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/Login") {
      navigate("/");
      toast.success("Logout Successfully!");
    }
  }, [user]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className="nav-link me-3 " to="/">
            <img
              width="35"
              height="35"
              className="d-inline-block align-top"
              src={logoReact}
              alt="Logo React"
            />
            <span className="fs-4 fw-semibold">React</span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) ||
              window.location.pathname === "/" ||
              window.location.pathname === "/ManageUsers") && (
              <>
                <Nav className="me-auto">
                  <NavLink className="nav-link fw-medium mt-1" to="/">
                    Home
                  </NavLink>
                  <NavLink
                    className="nav-link fw-medium mt-1"
                    to="/ManageUsers"
                  >
                    Manage Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.auth === true ? (
                    <span className="nav-link">
                      Welcom <b>{user.email}</b>
                    </span>
                  ) : (
                    ""
                  )}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item
                        className="fw-medium"
                        onClick={() => handleLogout()}
                      >
                        Logout{" "}
                        <i
                          style={{ fontSize: "13px" }}
                          className="fa-solid fa-arrow-right-from-bracket"
                        ></i>
                      </NavDropdown.Item>
                    ) : (
                      <NavLink className="dropdown-item fw-medium" to="/Login">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
