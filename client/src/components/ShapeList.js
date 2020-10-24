import React, { useState } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
  Jumbotron,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import TextInput from "./common/TextInput";

const ShapeList = ({
  shapes,
  loading,
  shapeValue,
  onChange,
  isAuthenticated,
  submit,
  toggle,
  modal,
  serverErrors,
  clientErrors,
  deleteShape,
  modifyShape,
  inputMode,
  currentShape,
}) => {
  return (
    <>
      <Jumbotron>
        <Row>
          <Col>
            <h4 className="mb-5">Frame Shapes</h4>
          </Col>
          {isAuthenticated ? (
            <Col className="text-right">
              <Button color="success" onClick={toggle}>
                Add
              </Button>
            </Col>
          ) : null}
        </Row>

        <Container
          style={{ height: "70%" }}
          className={
            (loading ? "d-flex" : "d-none") +
            " justify-content-center align-items-center"
          }
        >
          <Spinner color="success" style={{ height: "50px", width: "50px" }} />
        </Container>
        <ListGroup>
          {shapes
            ? shapes.map((shape) => (
                <ListGroupItem key={shape._id} name={shape.value}>
                  <Row>
                    <Col className="my-auto">{shape.text}</Col>
                    {isAuthenticated ? (
                      <Col className="text-right">
                        <Button
                          onClick={modifyShape}
                          name={shape._id}
                          color="warning"
                        >
                          Modify
                        </Button>
                        <Button
                          onClick={deleteShape}
                          name={shape._id}
                          color="danger"
                          className="mx-3"
                        >
                          Delete
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                </ListGroupItem>
              ))
            : null}
        </ListGroup>
      </Jumbotron>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {inputMode ? "Add a new shape" : "Modify the shape"}
        </ModalHeader>
        {serverErrors.msg ? (
          <Alert color="danger">{serverErrors.msg}</Alert>
        ) : null}
        <ModalBody>
          <TextInput
            label="Shape name"
            name="value"
            id="shapeName"
            placeHolder="New shape name"
            type="text"
            value={inputMode ? shapeValue : currentShape.value}
            onChange={onChange}
            error={clientErrors.value}
            disabled={false}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              submit();
            }}
          >
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ShapeList;
