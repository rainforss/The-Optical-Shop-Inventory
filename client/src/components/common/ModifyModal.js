import React from "react";
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
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";
import RadioInput from "../common/RadioInput";
import ColorSelector from "../common/ColorSelector";

const ModifyModal = ({
  modalOpen,
  toggle,
  currentItem,
  isAuthenticated,
  inputErrors,
  onChange,
  onSubmit,
  serverError,
  changeImage,
  itemImage,
  colorDropDownOpen,
  colorSearchValue,
  toggleColorDropDown,
  changeSearchValue,
  onColorSelect,
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
            <Row form>
              <Col xs={4}>
                <TextInput
                  label="Eye size"
                  name="eyeSize"
                  id="eyeSize"
                  value={currentItem.eyeSize}
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
                  value={currentItem.bridgeWidth}
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
                  value={currentItem.templeLength}
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
              selected={currentItem.material}
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
              selected={currentItem.frameShape}
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
              selected={currentItem.frameType}
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
              colorValue={currentItem.frameColor}
              type="text"
              dropdownOpen={colorDropDownOpen}
              toggleDropDown={toggleColorDropDown}
              colorSearchValue={colorSearchValue}
              onChange={changeSearchValue}
              onClick={onColorSelect}
            />
            <RadioInput
              name="hingeType"
              legend="Hinge Type"
              onChange={onChange}
              selected={currentItem.hingeType}
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
              selected={currentItem.hasNosePads}
              options={[
                { text: "YES", value: true },
                { text: "NO", value: false },
              ]}
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
              <>
                <TextInput
                  label="Replace Image"
                  name="file"
                  id="file"
                  type="file"
                  onChange={changeImage}
                  warning={
                    itemImage
                      ? null
                      : "Choose new file if you wish to replace the old image"
                  }
                />
                <Button
                  type="submit"
                  color="warning"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Confirm Change
                </Button>
              </>
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
  colorDropDownOpen: PropTypes.bool.isRequired,
  colorSearchValue: PropTypes.string,
  toggleColorDropDown: PropTypes.func.isRequired,
  changeSearchValue: PropTypes.func.isRequired,
  onColorSelect: PropTypes.func.isRequired,
};

export default ModifyModal;
