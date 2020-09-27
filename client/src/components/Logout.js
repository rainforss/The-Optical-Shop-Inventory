import React from "react";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

const Logout = ({ onClick }) => {
  return (
    <>
      <NavLink onClick={onClick} href="#">
        Logout
      </NavLink>
    </>
  );
};

Logout.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Logout;
