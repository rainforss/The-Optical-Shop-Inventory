import React from "react";
import { Input, Button, Container } from "reactstrap";

const SearchBar = ({ onSearch, value, onChange }) => {
  return (
    <Container
      className="d-flex justify-content-end mb-5"
      style={{ display: "inline" }}
    >
      <Input
        type="search"
        name="search"
        id="search"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="mr-4"
        style={{ display: "inline", width: "60%" }}
      />
      <Button onClick={onSearch} color="success">
        Search
      </Button>
    </Container>
  );
};

export default SearchBar;
