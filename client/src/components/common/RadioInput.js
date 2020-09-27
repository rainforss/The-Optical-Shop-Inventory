import React from "react";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";

const RadioInput = ({ legend, options, name, onChange, selected }) => {
  return (
    <FormGroup tag="fieldset" className="mt-4 mb-4">
      <legend style={{ fontSize: "1rem" }}>{legend}</legend>

      {options.map((option) => (
        //  <Col key={option.text} xs={12 / options.length}>
        <FormGroup className="mr-lg-4" key={option.text} check inline>
          <Label check>
            <Input
              type="radio"
              style={{ fontSize: "0.8rem" }}
              onChange={onChange}
              name={name}
              value={option.value}
              checked={option.value === selected}
            />
            {option.text}
          </Label>
        </FormGroup>
        //  </Col>
      ))}
    </FormGroup>
  );
};

export default RadioInput;
