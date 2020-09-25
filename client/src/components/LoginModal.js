import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const LoginModal = ({ login, clearErrors, error, auth }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState({});
  const toggle = () => {
    setModalOpen(!modalOpen);
    clearErrors();
    resetFormInputs();
  };
  const onChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };
  const resetFormInputs = () => {
    setInputFields({
      email: "",
      password: "",
    });
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

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setServerError({ msg: error.msg.msg });
    } else {
      setServerError({ msg: null });
    }

    if (modalOpen) {
      if (auth.isAuthenticated) {
        toast.success(
          `Welcome back ${auth.user.name}, you can now manage inventory now`
        );
        toggle();
      }
    }
  }, [error, auth.isAuthenticated, modalOpen]);

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Log in to manage inventory</ModalHeader>
        {serverError.msg ? (
          <Alert color="danger">{serverError.msg}</Alert>
        ) : null}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Email Address"
              name="email"
              id="email"
              value={inputFields.email}
              placeHolder="Please enter your email"
              onChange={onChange}
              type="text"
            />
            <TextInput
              label="Password"
              name="password"
              id="password"
              value={inputFields.password}
              placeHolder="Please enter password"
              onChange={onChange}
              type="password"
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
