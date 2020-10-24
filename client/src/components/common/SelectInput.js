import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SelectInput = ({
  label,
  name,
  id,
  onChange,
  options,
  disabled,
  value,
}) => {
  return (
    <FormGroup disabled={disabled}>
      <Label for={id}>{label}</Label>
      <Input
        type="select"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.text} value={option.value}>
            {option.text}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default SelectInput;
