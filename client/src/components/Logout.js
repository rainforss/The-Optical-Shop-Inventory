import React from "react";
import { logout } from "../actions/authActions";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Logout = ({ logout }) => {
  return (
    <>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
