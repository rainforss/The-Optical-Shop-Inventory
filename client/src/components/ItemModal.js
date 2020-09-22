import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, Alert } from "reactstrap";
import { connect } from "react-redux";
import { addItem, resetStatus } from "../actions/itemActions";
import { clearErrors } from "../actions/errorActions";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import PropTypes from "prop-types";

const ItemModal = ({
  addItem,
  isAuthenticated,
  error,
  item,
  clearErrors,
  resetStatus,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    name: "",
    barcode: "",
    row: "",
    column: "",
    price: "",
    inStock: "YES",
    itemType: "Sunglasses",
  });
  const [itemImage, setItemImage] = useState();
  const [inputErrors, setInputErrors] = useState({});
  const [serverError, setServerError] = useState({});
  const [inputModified, setInputModified] = useState({});
  const toggle = () => {
    setModalOpen(!modalOpen);
    clearErrors();
    resetFormInputs();
    setInputModified({});
  };
  const onChange = (e) => {
    setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
    setInputModified({ ...inputModified, [e.target.name]: true });
  };
  const resetFormInputs = () => {
    setItemInfo({
      name: "",
      barcode: "",
      row: "",
      column: "",
      price: "",
      inStock: "YES",
      itemType: "Sunglasses",
    });
  };

  const validate = () => {
    const errors = {};
    if (inputModified.name && itemInfo.name.trim().length < 6) {
      errors.name =
        "Please enter brand name and model number, at least 6 characters";
    } else {
      errors.name = "";
    }
    if (inputModified.barcode && itemInfo.barcode.trim().length < 6) {
      errors.barcode = "Barcode contains at least 6 digits";
    } else {
      errors.barcode = "";
    }
    if (inputModified.row && itemInfo.row.trim().length === 0) {
      errors.row = "You must enter a row number";
    } else {
      errors.row = "";
    }

    if (inputModified.column && itemInfo.column.trim().length === 0) {
      errors.column = "You must enter a column number";
    } else {
      errors.column = "";
    }
    if (inputModified.price && itemInfo.price.trim().length === 0) {
      errors.price = "You must enter item's price";
    } else {
      errors.price = "";
    }
    setInputErrors(errors);
  };

  const validateForm = () => {
    const errors = {};
    let errorNumber = 0;
    if (itemInfo.name.trim().length < 6) {
      errors.name =
        "Please enter brand name and model number, at least 6 characters";
      errorNumber++;
    } else {
      errors.name = "";
    }
    if (itemInfo.barcode.trim().length < 6) {
      errors.barcode = "Barcode contains at least 6 digits";
      errorNumber++;
    } else {
      errors.barcode = "";
    }
    if (itemInfo.row.trim().length === 0) {
      errors.row = "You must enter a row number";
      errorNumber++;
    } else {
      errors.row = "";
    }

    if (itemInfo.column.trim().length === 0) {
      errors.column = "You must enter a column number";
      errorNumber++;
    } else {
      errors.column = "";
    }
    if (itemInfo.price.trim().length === 0) {
      errors.price = "You must enter item's price";
      errorNumber++;
    } else {
      errors.price = "";
    }
    setInputErrors(errors);

    return errorNumber === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setInputModified({
      name: true,
      barcode: true,
      row: true,
      column: true,
      price: true,
    });
    const errorFree = validateForm();
    if (!errorFree) return;
    const file = new FormData();
    file.append("file", itemImage);
    file.append("upload_preset", "opticalshop");
    file.append("public_id", `${itemInfo.name}AND${itemInfo.barcode}`);
    file.append("cloud_name", "rainforss");
    const newItem = {
      name: itemInfo.name,
      barcode: itemInfo.barcode,
      row: itemInfo.row,
      column: itemInfo.column,
      price: itemInfo.price,
      inStock: itemInfo.inStock === "YES" ? true : false,
      itemType: itemInfo.itemType,
    };
    addItem(newItem, file);
  };

  useEffect(() => {
    validate();
  }, [itemInfo]);

  useEffect(() => {
    if (error.id === "ITEM_ERROR") {
      setServerError({ msg: error.msg.msg });
    } else {
      setServerError({ msg: null });
    }
    if (modalOpen) {
      if (item.actionSuccess) {
        resetStatus();
        toggle();
      }
    }
  }, [error, item.actionSuccess, modalOpen]);
  return (
    <>
      {isAuthenticated ? (
        <Button color="dark" onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <Alert color="primary" style={{ marginBottom: "5rem" }}>
          Please log in to manage inventory
        </Alert>
      )}

      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add item to inventory</ModalHeader>
        {serverError.msg ? (
          <Alert color="danger">{serverError.msg}</Alert>
        ) : null}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Item Name"
              name="name"
              id="name"
              value={itemInfo.name}
              placeHolder="New item name"
              onChange={onChange}
              error={inputErrors.name}
              type="text"
            />
            <TextInput
              label="Item Barcode"
              name="barcode"
              id="barcode"
              value={itemInfo.barcode}
              placeHolder="New item barcode"
              onChange={onChange}
              error={inputErrors.barcode}
              type="text"
            />
            <TextInput
              label="Row position"
              name="row"
              id="row"
              value={itemInfo.row}
              placeHolder="Enter row number"
              onChange={onChange}
              error={inputErrors.row}
              type="text"
            />
            <TextInput
              label="Column position"
              name="column"
              id="column"
              value={itemInfo.column}
              placeHolder="Enter column number"
              onChange={onChange}
              error={inputErrors.column}
              type="text"
            />
            <TextInput
              label="Price"
              name="price"
              id="price"
              value={itemInfo.price}
              placeHolder="Enter item price"
              onChange={onChange}
              error={inputErrors.price}
              type="text"
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
            <TextInput
              label="Upload Image"
              name="file"
              id="file"
              type="file"
              onChange={(e) => {
                setItemImage(e.target.files[0]);
                console.log(e.target.files);
              }}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

ItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  resetStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addItem,
  clearErrors,
  resetStatus,
})(React.memo(ItemModal));
