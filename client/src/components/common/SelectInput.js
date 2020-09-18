import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SelectInput = ({ label, name, id, onChange, options }) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type="select"
        name={name}
        id={id}
        onChange={onChange}
        defaultValue={options[0]}
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
