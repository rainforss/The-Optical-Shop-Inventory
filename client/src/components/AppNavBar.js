import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container,
  NavbarText,
} from "reactstrap";
import LoginModal from "./LoginModal";
import Logout from "./Logout";
import { logout } from "../actions/authActions";
import RegisterModal from "./RegisterModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AppNavbar = ({ auth, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, user } = auth;
  const handleLogOut = () => {
    logout();
    toast.warning("You have logged out of The Optical Shop IMS.");
  };
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="mb-5">
        <Container>
          <NavbarBrand href="/">The Optical Shop IMS</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className={isAuthenticated ? "" : "d-none"}>
                <Logout onClick={handleLogOut} />
              </NavItem>
              <NavItem>
                <span className="navbar-text mr-3">
                  <strong>{user ? `Welcome, ${user.name}` : ""}</strong>
                </span>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    exact
                    to="/"
                  >
                    Items
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/specs"
                  >
                    Specs
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem className={isAuthenticated ? "d-none" : ""}>
                <RegisterModal />
              </NavItem>
              <NavItem className={isAuthenticated ? "d-none" : ""}>
                <LoginModal />
              </NavItem>
            </Nav>
            <NavbarText className="ml-5">Management at ease</NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(AppNavbar);
