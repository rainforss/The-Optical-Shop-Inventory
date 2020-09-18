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
import { register } from "../actions/authActions";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const RegisterModal = ({ register }) => {
  const [modalOpen, SetModalOpen] = useState(false);
  const [inputFields, SetInputFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [inputErrors, SetInputErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const toggle = () => SetModalOpen(!modalOpen);
  const onChange = (e) => {
    SetInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = inputFields;
    const newUser = {
      name,
      email,
      password,
    };
    register(newUser);
  };

  //NEED FULLY FUNCTIONAL ERROR RESPONSE AND CLIENT SIDE VALIDATION

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register a management account</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Full Name"
              name="name"
              id="name"
              value={inputFields.name}
              placeHolder="Please enter your name"
              onChange={onChange}
            />
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
            <TextInput
              label="Confirm Password"
              name="confirm"
              id="confirm"
              value={inputFields.confirm}
              placeHolder="Please confirm password"
              onChange={onChange}
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
};

export default connect(mapStateToProps, { register })(RegisterModal);
