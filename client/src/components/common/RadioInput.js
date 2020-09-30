import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const RadioInput = ({
  legend,
  options,
  name,
  onChange,
  selected,
  disabled,
}) => {
  return (
    <FormGroup tag="fieldset" className="mt-4 mb-4">
      <legend style={{ fontSize: "1rem" }}>{legend}</legend>

      {options.map((option) => (
        <FormGroup
          className="mr-lg-4"
          key={option.text}
          check
          inline
          disabled={disabled}
        >
          <Label check>
            <Input
              type="radio"
              style={{ fontSize: "0.8rem" }}
              onChange={onChange}
              name={name}
              value={option.value}
              checked={option.value === selected}
              disabled={disabled}
            />
            {option.text}
          </Label>
        </FormGroup>
      ))}
    </FormGroup>
  );
};

export default RadioInput;
