import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SelectInput = ({ label, name, id, onChange, options, disabled }) => {
  return (
    <FormGroup disabled={disabled}>
      <Label for={id}>{label}</Label>
      <Input
        type="select"
        name={name}
        id={id}
        onChange={onChange}
        defaultValue={options[0]}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default SelectInput;
