import React from "react";
import { Container, Progress, Button } from "reactstrap";

const Footer = ({ progressText, buttonText, value, max, onClick }) => {
  return (
    <Container fluid>
      <div className="text-center mt-5 mb-3">{progressText}</div>
      <Progress value={value} max={max} />
      <Button
        disabled={value === max}
        block
        size="sm"
        color="secondary"
        onClick={onClick}
        className="mt-3 mb-5"
      >
        {buttonText}
      </Button>
    </Container>
  );
};

export default Footer;
