import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const LoginModal = ({ login }) => {
  const [modalOpen, SetModalOpen] = useState(false);
  const [inputFields, SetInputFields] = useState({
    email: "",
    password: "",
  });
  const toggle = () => SetModalOpen(!modalOpen);
  const onChange = (e) => {
    SetInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputFields;
    const user = {
      email,
      password,
    };
    login(user);
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Log in to manage inventory</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Email Address"
              name="email"
              id="email"
              value={inputFields.email}
              placeHolder="Please enter your email"
              onChange={onChange}
            />
            <TextInput
              label="Password"
              name="password"
              id="password"
              value={inputFields.password}
              placeHolder="Please enter password"
              onChange={onChange}
            />

            <Button
              type="submit"
              color="dark"
              style={{ marginTop: "2rem" }}
              block
            >
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

LoginModal.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(LoginModal);
