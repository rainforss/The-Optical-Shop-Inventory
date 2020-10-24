import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

const CheckBoxInput = ({ label, name, id, onChange, options, selected }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="mx-auto w-75">
      {/* <Label>{label}</Label>
      {options.map((option) => (
        <FormGroup key={option.value} check>
          <Label check>
            <Input
              type="checkbox"
              value={option.value}
              name={name}
              onChange={onChange}
              id={id}
            />
            {option.text}
          </Label>
        </FormGroup>
      ))} */}
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret block color="info">
          {label}
        </DropdownToggle>
        <DropdownMenu className="w-100 filter-dropdowns">
          {options.map((option) => (
            <div key={option.text} className="px-5 mx-auto py-2 checkbox">
              <FormGroup check>
                <Label className="w-100" check>
                  <Input
                    type="checkbox"
                    value={option.value}
                    name={name}
                    data-name={option.value}
                    onChange={onChange}
                    id={id}
                    checked={selected ? selected.includes(option.value) : false}
                  />
                  {option.text}
                </Label>
              </FormGroup>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CheckBoxInput;
