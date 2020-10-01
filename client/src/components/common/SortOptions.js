import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const SortOptions = ({ options, onClick, selected, sortName }) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle outline color="primary" caret>
        {sortName}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            name={option.value}
            onClick={onClick}
            style={
              option.value === selected
                ? { backgroundColor: "lightskyblue" }
                : {}
            }
          >
            {option.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default SortOptions;
