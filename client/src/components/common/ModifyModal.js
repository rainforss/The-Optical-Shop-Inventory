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
              disabled={true}
            />
            <TextInput
              label="Item Barcode"
              name="barcode"
              id="barcode-mod"
              value={currentItem.barcode}
              error={inputErrors.barcode}
              onChange={onChange}
              type="text"
              disabled={true}
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
                  disabled={!isAuthenticated}
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
                  disabled={!isAuthenticated}
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
                  disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
            />
            <RadioInput
              name="hasNosePads"
              legend="Nose pads"
              onChange={onChange}
              selected={currentItem.hasNosePads}
              options={[
                { text: "YES", value: "YES" },
                { text: "NO", value: "NO" },
              ]}
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
            />
            <SelectInput
              label="In Stock"
              name="inStock"
              id="inStock"
              value={currentItem.inStock ? "YES" : "NO"}
              onChange={onChange}
              options={["YES", "NO"]}
              disabled={!isAuthenticated}
            />
            <SelectInput
              label="Eyewear Type"
              name="itemType"
              id="itemType"
              value={currentItem.itemType}
              onChange={onChange}
              options={["Sunglasses", "Eyeglasses"]}
              disabled={!isAuthenticated}
            />

            {isAuthenticated ? (
              <>
                <TextInput
                  label="Replace Front View"
                  name="front"
                  id="front"
                  type="file"
                  onChange={changeImage}
                  warning={
                    itemImage.front
                      ? null
                      : "Choose new front view if you wish to replace the old image"
                  }
                />
                <TextInput
                  label="Replace Side View"
                  name="side"
                  id="side"
                  type="file"
                  onChange={changeImage}
                  warning={
                    itemImage.side
                      ? null
                      : "Choose new side view if you wish to replace the old image"
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
