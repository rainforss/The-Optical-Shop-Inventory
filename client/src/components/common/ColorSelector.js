import React from "react";
import {
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
} from "reactstrap";
import { Search } from "react-bootstrap-icons";
import { NamedColors } from "./ColorGroup";

const ColorSelector = ({
  id,
  label,
  type,
  name,
  colorValue,
  dropdownOpen,
  toggleDropDown,
  colorSearchValue,
  onChange,
  onClick,
  warning,
  disabled,
}) => {
  const filteredColors = NamedColors.filter((color) =>
    color.group.toLowerCase().includes(colorSearchValue)
  );
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <InputGroup>
        <Input
          type={type}
          name={name}
          id={id}
          placeholder="Choose color use the button"
          value={colorValue}
          readOnly
        />
        <InputGroupButtonDropdown
          addonType="append"
          isOpen={dropdownOpen}
          toggle={toggleDropDown}
        >
          <DropdownToggle
            style={{
              backgroundColor: "white",
              color: "black",
              border: `${colorValue} 5px solid`,
              padding: "0px 6px 0px 6px",
            }}
            caret
            disabled={disabled}
          >
            Choose Color
          </DropdownToggle>
          <DropdownMenu className="color-drop-down">
            <InputGroup className="pl-2 pr-2">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Enter color"
                value={colorSearchValue}
                onChange={onChange}
              />
            </InputGroup>
            {filteredColors.map((color) => (
              <DropdownItem
                style={{
                  border: `${color.hex} 6px solid`,
                  width: "90%",
                  margin: "auto",
                }}
                className="mt-2 mb-2"
                key={color.name}
                name={color.hex}
                onClick={onClick}
                data-group={color.group}
              >
                {color.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>
      {warning ? <FormText color="warning">{warning}</FormText> : null}
    </FormGroup>
  );
};

export default ColorSelector;
