import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, Alert } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import PropTypes from "prop-types";

const ItemModal = ({ addItem, isAuthenticated }) => {
  const [modalOpen, SetModalOpen] = useState(false);
  const [itemInfo, SetItemInfo] = useState({
    name: "",
    barcode: "",
    row: null,
    column: null,
    price: "",
    inStock: "YES",
    itemType: "Sunglasses",
  });
  const toggle = () => SetModalOpen(!modalOpen);
  const onChange = (e) => {
    SetItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: itemInfo.name,
      barcode: itemInfo.barcode,
      row: parseInt(itemInfo.row),
      column: parseInt(itemInfo.column),
      price: itemInfo.price,
      inStock: itemInfo.inStock === "YES" ? true : false,
      itemType: itemInfo.itemType,
    };
    addItem(newItem);
    toggle();
    SetItemInfo({
      name: "",
      barcode: "",
      row: null,
      column: null,
      price: "",
      inStock: "YES",
      itemType: "Sunglasses",
    });
  };
  return (
    <div>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "5rem" }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <Alert color="primary" style={{ marginBottom: "5rem" }}>
          Please log in to manage inventory
        </Alert>
      )}

      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add item to inventory</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Item Name"
              name="name"
              id="name"
              value={itemInfo.name}
              placeHolder="New item name"
              onChange={onChange}
            />
            <TextInput
              label="Item Barcode"
              name="barcode"
              id="barcode"
              value={itemInfo.barcode}
              placeHolder="New item barcode"
              onChange={onChange}
            />
            <TextInput
              label="Row position"
              name="row"
              id="row"
              value={itemInfo.row}
              placeHolder="Enter row position"
              onChange={onChange}
            />
            <TextInput
              label="Column position"
              name="column"
              id="column"
              value={itemInfo.column}
              placeHolder="Enter column position"
              onChange={onChange}
            />
            <TextInput
              label="Price"
              name="price"
              id="price"
              value={itemInfo.price}
              placeHolder="Enter item price"
              onChange={onChange}
            />
            <SelectInput
              label="In Stock"
              name="inStock"
              id="inStock"
              value={itemInfo.inStock}
              onChange={onChange}
              options={["YES", "NO"]}
            />
            <SelectInput
              label="Eyewear Type"
              name="itemType"
              id="itemType"
              value={itemInfo.itemType}
              onChange={onChange}
              options={["Sunglasses", "Eyeglasses"]}
            />
            <Button
              type="submit"
              color="dark"
              style={{ marginTop: "2rem" }}
              block
            >
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

ItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { addItem })(React.memo(ItemModal));
