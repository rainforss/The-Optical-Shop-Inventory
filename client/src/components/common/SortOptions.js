import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const SortOptions = ({ options, onClick, selected }) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle outline color="primary" caret>
        Sort By
      </DropdownToggle>
      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem
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
