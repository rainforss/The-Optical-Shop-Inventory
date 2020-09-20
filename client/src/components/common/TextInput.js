import React from "react";
import { FormGroup, Label, Input, Alert } from "reactstrap";

const TextInput = ({ label, name, id, placeHolder, onChange, error, type }) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeHolder}
        onChange={onChange}
      />
      {error ? (
        <Alert color="danger" style={{ fontSize: "0.8rem" }}>
          {error}
        </Alert>
      ) : null}
    </FormGroup>
  );
};

export default TextInput;