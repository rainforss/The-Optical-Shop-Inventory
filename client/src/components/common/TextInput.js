import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const TextInput = ({ label, name, id, placeHolder, onChange }) => {
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
    </FormGroup>
  );
};

export default TextInput;
