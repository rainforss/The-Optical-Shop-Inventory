import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarText,
} from "reactstrap";
import LoginModal from "./LoginModal";
import Logout from "./Logout";
import RegisterModal from "./RegisterModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, user } = auth;
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="mb-5">
        <Container>
          <NavbarBrand href="/">The Optical Shop IMS</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/rainforss">GitHub</NavLink>
              </NavItem>
              {isAuthenticated ? (
                <>
                  <NavItem>
                    <Logout />
                  </NavItem>
                  <NavItem>
                    <span className="navbar-text mr-3">
                      <strong>{user ? `Welcome, ${user.name}` : ""}</strong>
                    </span>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <RegisterModal />
                  </NavItem>
                  <NavItem>
                    <LoginModal />
                  </NavItem>
                </>
              )}
            </Nav>
            <NavbarText className="ml-5">Powered by React</NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(AppNavbar);
