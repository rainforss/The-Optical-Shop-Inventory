import React from "react";
import { FormGroup, Label, Input, Alert } from "reactstrap";

const TextInput = ({ label, name, id, placeHolder, onChange, error }) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type="text"
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
