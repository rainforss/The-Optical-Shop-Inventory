import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Alert,
  Row,
  Col,
} from "reactstrap";

import { connect } from "react-redux";
import { addItem, resetStatus } from "../actions/itemActions";
import { clearErrors } from "../actions/errorActions";
import TextInput from "./common/TextInput";
import RadioInput from "./common/RadioInput";
import SelectInput from "./common/SelectInput";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ColorSelector from "./common/ColorSelector";

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
    eyeSize: "",
    bridgeWidth: "",
    templeLength: "",
    material: "metal",
    frameShape: "circle",
    frameType: "fullRim",
    frameColor: "#000000",
    colorGroup: "grey",
    hingeType: "standard",
    hasNosePads: "YES",
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
  const [colorDropDownOpen, setColorDropDownOpen] = useState(false);
  const [colorSearchValue, setColorSearchValue] = useState("");

  const toggleColorDropDown = () => {
    setColorDropDownOpen(!colorDropDownOpen);
  };
  const toggle = () => {
    if (modalOpen) {
      clearErrors();
      resetFormInputs();
      setInputModified({});
    }
    setModalOpen(!modalOpen);
  };
  const onChange = (e) => {
    setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
    setInputModified({ ...inputModified, [e.target.name]: true });
  };
  const onColorSelect = (e) => {
    setItemInfo({
      ...itemInfo,
      frameColor: e.currentTarget.name,
      colorGroup: e.currentTarget.dataset.group,
    });
    setInputModified({ ...inputModified, [e.currentTarget.name]: true });
  };

  const resetFormInputs = () => {
    setItemInfo({
      name: "",
      eyeSize: "",
      bridgeWidth: "",
      templeLength: "",
      material: "metal",
      frameShape: "circle",
      frameType: "fullRim",
      frameColor: "#000000",
      colorGroup: "grey",
      hingeType: "standard",
      hasNosePads: "YES",
      barcode: "",
      row: "",
      column: "",
      price: "",
      inStock: "YES",
      itemType: "Sunglasses",
    });
    setItemImage();
  };

  const validate = () => {
    const errors = {};
    if (inputModified.name && itemInfo.name.trim().length < 6) {
      errors.name =
        "Please enter brand name and model number, at least 6 characters";
    } else {
      errors.name = "";
    }
    if (inputModified.eyeSize && itemInfo.eyeSize.trim().length < 2) {
      errors.eyeSize = "Eye size contains at least 2 digits";
    } else {
      errors.eyeSize = "";
    }
    if (inputModified.bridgeWidth && itemInfo.bridgeWidth.trim().length < 2) {
      errors.bridgeWidth = "Bridge width contains at least 2 digits";
    } else {
      errors.bridgeWidth = "";
    }
    if (inputModified.templeLength && itemInfo.templeLength.trim().length < 3) {
      errors.templeLength = "Temple length contains at least 3 digits";
    } else {
      errors.templeLength = "";
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
    if (itemInfo.eyeSize.trim().length < 2) {
      errors.eyeSize = "Eye size contains at least 2 digits";
      errorNumber++;
    } else {
      errors.eyeSize = "";
    }
    if (itemInfo.bridgeWidth.trim().length < 2) {
      errors.bridgeWidth = "Bridge width contains at least 2 digits";
      errorNumber++;
    } else {
      errors.bridgeWidth = "";
    }
    if (itemInfo.templeLength.trim().length < 3) {
      errors.templeLength = "Temple length contains at least 3 digits";
      errorNumber++;
    } else {
      errors.templeLength = "";
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
      eyeSize: true,
      bridgeWidth: true,
      templeLength: true,
      barcode: true,
      row: true,
      column: true,
      price: true,
    });
    const errorFree = validateForm();
    if (!errorFree) return;
    let file;
    if (itemImage) {
      file = new FormData();
      file.append("file", itemImage);

      file.append("upload_preset", "opticalshop");
      file.append("public_id", `${itemInfo.name}AND${itemInfo.barcode}`);
      file.append("cloud_name", "rainforss");
    }

    const newItem = {
      name: itemInfo.name,
      barcode: itemInfo.barcode,
      row: itemInfo.row,
      column: itemInfo.column,
      price: itemInfo.price,
      inStock: itemInfo.inStock,
      itemType: itemInfo.itemType,
      eyeSize: itemInfo.eyeSize,
      bridgeWidth: itemInfo.bridgeWidth,
      templeLength: itemInfo.templeLength,
      material: itemInfo.material,
      frameShape: itemInfo.frameShape,
      frameType: itemInfo.frameType,
      hingeType: itemInfo.hingeType,
      hasNosePads: itemInfo.hasNosePads,
      frameColor: itemInfo.frameColor,
      colorGroup: itemInfo.colorGroup,
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
        toast.success("New item has been successfully added!");
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
        <Alert color="primary">Please log in to manage inventory</Alert>
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
            <Row form>
              <Col xs={4}>
                <TextInput
                  label="Eye size"
                  name="eyeSize"
                  id="eyeSize"
                  value={itemInfo.eyeSize}
                  placeHolder="x x"
                  onChange={onChange}
                  error={inputErrors.eyeSize}
                  type="text"
                />
              </Col>
              <Col xs={4}>
                <TextInput
                  label="Bridge width"
                  name="bridgeWidth"
                  id="bridgeWidth"
                  value={itemInfo.bridgeWidth}
                  placeHolder="x x"
                  onChange={onChange}
                  error={inputErrors.bridgeWidth}
                  type="text"
                />
              </Col>
              <Col xs={4}>
                <TextInput
                  label="Temple length"
                  name="templeLength"
                  id="templeLength"
                  value={itemInfo.templeLength}
                  placeHolder="x x x"
                  onChange={onChange}
                  error={inputErrors.templeLength}
                  type="text"
                />
              </Col>
            </Row>
            <RadioInput
              name="material"
              legend="Material"
              onChange={onChange}
              selected={itemInfo.material}
              options={[
                { text: "Metal", value: "metal" },
                { text: "Acetate", value: "acetate" },
                { text: "Composite", value: "composite" },
              ]}
            />
            <RadioInput
              name="frameShape"
              legend="Frame Shape"
              onChange={onChange}
              selected={itemInfo.frameShape}
              options={[
                { text: "Circle", value: "circle" },
                { text: "R-edge", value: "roundEdges" },
                { text: "Rect", value: "rectangular" },
                { text: "Irregular", value: "irregular" },
              ]}
            />
            <RadioInput
              name="frameType"
              legend="Frame Type"
              onChange={onChange}
              selected={itemInfo.frameType}
              options={[
                { text: "Full-rim", value: "fullRim" },
                { text: "Semi-rimless", value: "semiRimless" },
                { text: "Full-rimless", value: "fullRimless" },
              ]}
            />
            <ColorSelector
              id="frameColor"
              name="frameColor"
              label="Frame Color"
              colorValue={itemInfo.frameColor}
              type="text"
              dropdownOpen={colorDropDownOpen}
              toggleDropDown={toggleColorDropDown}
              colorSearchValue={colorSearchValue}
              onChange={(e) => setColorSearchValue(e.target.value)}
              onClick={onColorSelect}
              warning={
                itemInfo.frameColor === "#000000" && !inputModified.frameColor
                  ? "If no color is selected, system will use default color black"
                  : null
              }
            />
            <RadioInput
              name="hingeType"
              legend="Hinge Type"
              onChange={onChange}
              selected={itemInfo.hingeType}
              options={[
                { text: "Standard", value: "standard" },
                { text: "Spring", value: "spring" },
                { text: "Flex", value: "flex" },
                { text: "Hingeless", value: "hingeless" },
              ]}
            />
            <RadioInput
              name="hasNosePads"
              legend="Nose pads"
              onChange={onChange}
              selected={itemInfo.hasNosePads}
              options={[
                { text: "YES", value: "YES" },
                { text: "NO", value: "NO" },
              ]}
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
              }}
              warning={
                itemImage
                  ? null
                  : "If no image is uploaded at this time, system will use a default image"
              }
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
