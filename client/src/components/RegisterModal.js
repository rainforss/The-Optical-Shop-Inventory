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
import { register, resetRegisterStatus } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const RegisterModal = ({
  register,
  error,
  auth,
  clearErrors,
  resetRegisterStatus,
}) => {
  const [modalOpen, SetModalOpen] = useState(false);
  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [inputErrors, setInputErrors] = useState({});
  const [serverError, setServerError] = useState({});
  const [inputModified, setInputModified] = useState({});
  const toggle = () => {
    SetModalOpen(!modalOpen);
    clearErrors();
    resetFormInputs();
    setInputModified({});
  };
  const onChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    setInputModified({ ...inputModified, [e.target.name]: true });
  };
  const resetFormInputs = () => {
    setInputFields({
      name: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  const validate = () => {
    const errors = {};
    if (inputModified.name && inputFields.name.trim().length < 6) {
      errors.name = "Your name has to contain at least 6 characters";
    } else {
      errors.name = "";
    }
    if (inputModified.email && inputFields.email.trim().length < 6) {
      errors.email = "Please enter a valid email address";
    } else {
      errors.email = "";
    }
    if (
      inputModified.password &&
      (inputFields.password.trim().length < 6 ||
        inputFields.password.trim().includes(" "))
    ) {
      errors.password = "Password has to contain at least 6 characters";
    } else {
      errors.password = "";
    }

    if (
      inputModified.confirm &&
      inputFields.confirm.trim() !== inputFields.password.trim()
    ) {
      errors.confirm = "Confirmation has to match your password";
    } else {
      errors.confirm = "";
    }
    setInputErrors(errors);
  };

  const validateForm = () => {
    const errors = {};
    let errorNumber = 0;
    if (inputFields.name.trim().length < 6) {
      errors.name = "Your name has to contain at least 6 characters";
      errorNumber++;
    } else {
      errors.name = "";
    }
    if (inputFields.email.trim().length < 6) {
      errors.email = "Please enter a valid email address";
      errorNumber++;
    } else {
      errors.email = "";
    }
    if (
      inputFields.password.trim().length < 6 ||
      inputFields.password.trim().includes(" ")
    ) {
      errors.password =
        "Password has to contain at least 6 characters and no spaces";
      errorNumber++;
    } else {
      errors.password = "";
    }

    if (inputFields.confirm.trim() !== inputFields.password.trim()) {
      errors.confirm = "Confirmation has to match your password";
      errorNumber++;
    } else {
      errors.confirm = "";
    }
    setInputErrors(errors);

    return errorNumber === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setInputModified({
      name: true,
      email: true,
      password: true,
      confirm: true,
    });
    const errorFree = validateForm();
    if (!errorFree) return;
    const { name, email, password } = inputFields;
    const newUser = {
      name,
      email,
      password,
    };
    register(newUser);
  };

  useEffect(() => {
    validate();
  }, [inputFields]);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setServerError({ msg: error.msg.msg });
    } else {
      setServerError({ msg: null });
    }

    if (modalOpen && auth.registerSuccess) {
      resetRegisterStatus();
      toggle();
    }
  }, [error, auth.registerSuccess]);

  //Client side validation finished, need server side error response implementation

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register a management account</ModalHeader>
        {serverError.msg ? (
          <Alert color="danger">{serverError.msg}</Alert>
        ) : null}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Full Name"
              name="name"
              id="name"
              value={inputFields.name}
              placeHolder="Please enter your name"
              onChange={onChange}
              error={inputErrors.name}
              type="text"
            />
            <TextInput
              label="Email Address"
              name="email"
              id="email"
              value={inputFields.email}
              placeHolder="Please enter your email"
              onChange={onChange}
              error={inputErrors.email}
              type="text"
            />
            <TextInput
              label="Password"
              name="password"
              id="password"
              value={inputFields.password}
              placeHolder="Please enter password"
              onChange={onChange}
              error={inputErrors.password}
              type="password"
            />
            <TextInput
              label="Confirm Password"
              name="confirm"
              id="confirm"
              value={inputFields.confirm}
              placeHolder="Please confirm password"
              onChange={onChange}
              error={inputErrors.confirm}
              type="password"
            />

            <Button
              type="submit"
              color="dark"
              style={{ marginTop: "2rem" }}
              block
            >
              Confirm registration
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

RegisterModal.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  resetRegisterStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  register,
  clearErrors,
  resetRegisterStatus,
})(RegisterModal);
