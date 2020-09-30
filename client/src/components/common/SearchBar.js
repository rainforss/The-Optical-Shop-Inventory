import React from "react";
import { Input, Button, Container } from "reactstrap";

const SearchBar = ({ onSearch, value, onChange, onKeyPress }) => {
  return (
    <Container
      className="d-flex justify-content-end align-items-center my-5"
      style={{ display: "inline" }}
    >
      <Input
        type="search"
        name="search"
        id="search"
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Search for item name or barcode"
        className="mr-4"
        style={{ display: "inline" }}
        value={value}
      />
      <Button onClick={onSearch} color="success">
        Search
      </Button>
    </Container>
  );
};

export default SearchBar;
