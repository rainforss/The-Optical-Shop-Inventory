import React from "react";
import { FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";

const TextInput = ({
  label,
  name,
  id,
  placeHolder,
  onChange,
  error,
  type,
  value,
  warning,
  disabled,
}) => {
  return (
    <FormGroup disabled={disabled}>
      <Label for={id}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
        valid={!error && value && !disabled ? true : false}
        invalid={error ? true : false}
        disabled={disabled}
      />
      <FormFeedback valid={!error}>{error}</FormFeedback>
      {warning ? <FormText color="warning">{warning}</FormText> : null}
    </FormGroup>
  );
};

export default TextInput;
