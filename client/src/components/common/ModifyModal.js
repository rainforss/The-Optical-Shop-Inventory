import React from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, Alert } from "reactstrap";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

const ModifyModal = ({
  modalOpen,
  toggle,
  currentItem,
  isAuthenticated,
  inputErrors,
  onChange,
  onSubmit,
  serverError,
}) => {
  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>View or log in to modify</ModalHeader>
        {serverError.msg ? (
          <Alert color="danger">{serverError.msg}</Alert>
        ) : null}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Item Name"
              name="name"
              id="name"
              value={currentItem.name}
              error={inputErrors.name}
              onChange={onChange}
              type="text"
            />
            <TextInput
              label="Item Barcode"
              name="barcode"
              id="barcode"
              value={currentItem.barcode}
              placeHolder="New item barcode"
              onChange={onChange}
              error={inputErrors.barcode}
              type="text"
            />
            <TextInput
              label="Row position"
              name="row"
              id="row"
              value={currentItem.row}
              placeHolder="Enter row number"
              onChange={onChange}
              error={inputErrors.row}
              type="text"
            />
            <TextInput
              label="Column position"
              name="column"
              id="column"
              value={currentItem.column}
              placeHolder="Enter column number"
              onChange={onChange}
              error={inputErrors.column}
              type="text"
            />
            <TextInput
              label="Price"
              name="price"
              id="price"
              value={currentItem.price}
              placeHolder="Enter item price"
              onChange={onChange}
              error={inputErrors.price}
              type="text"
            />
            <SelectInput
              label="In Stock"
              name="inStock"
              id="inStock"
              value={currentItem.inStock ? "YES" : "NO"}
              onChange={onChange}
              options={["YES", "NO"]}
            />
            <SelectInput
              label="Eyewear Type"
              name="itemType"
              id="itemType"
              value={currentItem.itemType}
              onChange={onChange}
              options={["Sunglasses", "Eyeglasses"]}
            />
            {isAuthenticated ? (
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Confirm Change
              </Button>
            ) : null}
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

ModifyModal.propType = {
  modalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  inputErrors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  serverError: PropTypes.object.isRequired,
};

export default ModifyModal;
