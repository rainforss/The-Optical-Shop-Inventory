import React from "react";
import { Button } from "reactstrap";
import { X } from "react-bootstrap-icons";
import CheckBoxInput from "./common/CheckBoxInput";

const Filter = ({
  onChange,
  filterOpen,
  toggleFilter,
  applyFilter,
  filterInfo,
  removeFilter,
}) => {
  return (
    <>
      <Button outline color="primary" onClick={toggleFilter}>
        Filters
      </Button>
      <div
        className="filter-bar"
        style={
          filterOpen
            ? { transform: "translateX(0)" }
            : { transform: "translateX(-100%)" }
        }
      >
        <Button block color="success" className="w-75" onClick={applyFilter}>
          Done
        </Button>
        <CheckBoxInput
          name="colorGroup"
          id="colorGroup"
          label="Frame Color"
          options={[
            { text: "Pink", value: "pink" },
            { text: "Purple", value: "purple" },
            { text: "Red", value: "red" },
            { text: "Orange", value: "orange" },
            { text: "Yellow", value: "yellow" },
            { text: "Green", value: "green" },
            { text: "Cyan", value: "cyan" },
            { text: "Blue", value: "blue" },
            { text: "Brown", value: "brown" },
            { text: "White", value: "white" },
            { text: "Grey", value: "grey" },
          ]}
          onChange={onChange}
          selected={filterInfo.colorGroup}
        />
        {filterInfo.colorGroup.length !== 0 ? (
          <div>
            {filterInfo.colorGroup.map((color) => (
              <Button
                name="colorGroup"
                value={color}
                key={color}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {color}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
        <CheckBoxInput
          name="material"
          id="material"
          label="Material"
          options={[
            { text: "Metal", value: "metal" },
            { text: "Acetate", value: "acetate" },
            { text: "Composite", value: "composite" },
          ]}
          onChange={onChange}
          selected={filterInfo.material}
        />
        {filterInfo.material.length !== 0 ? (
          <div>
            {filterInfo.material.map((material) => (
              <Button
                name="material"
                value={material}
                key={material}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {material}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
        <CheckBoxInput
          name="frameShape"
          id="frameShape"
          label="Frame Shape"
          options={[
            { text: "Circle", value: "circle" },
            { text: "R-edge", value: "roundEdges" },
            { text: "Rect", value: "rectangular" },
            { text: "Irregular", value: "irregular" },
          ]}
          onChange={onChange}
          selected={filterInfo.frameShape}
        />
        {filterInfo.frameShape.length !== 0 ? (
          <div>
            {filterInfo.frameShape.map((shape) => (
              <Button
                name="frameShape"
                value={shape}
                key={shape}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {shape}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
        <CheckBoxInput
          name="frameType"
          id="frameType"
          label="Frame Type"
          options={[
            { text: "Full-rim", value: "fullRim" },
            { text: "Semi-rimless", value: "semiRimless" },
            { text: "Full-rimless", value: "fullRimless" },
          ]}
          onChange={onChange}
          selected={filterInfo.frameType}
        />
        {filterInfo.frameType.length !== 0 ? (
          <div>
            {filterInfo.frameType.map((type) => (
              <Button
                name="frameType"
                value={type}
                key={type}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {type}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
        <CheckBoxInput
          name="hingeType"
          id="hingeType"
          label="Hinge Type"
          options={[
            { text: "Standard", value: "standard" },
            { text: "Spring", value: "spring" },
            { text: "Flex", value: "flex" },
            { text: "Hingeless", value: "hingeless" },
          ]}
          onChange={onChange}
          selected={filterInfo.hingeType}
        />
        {filterInfo.hingeType.length !== 0 ? (
          <div>
            {filterInfo.hingeType.map((type) => (
              <Button
                name="hingeType"
                value={type}
                key={type}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {type}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
        <CheckBoxInput
          name="hasNosePads"
          id="hasNosePads"
          label="Nose Pads"
          options={[
            { text: "YES", value: "YES" },
            { text: "NO", value: "NO" },
          ]}
          onChange={onChange}
          selected={filterInfo.hasNosePads}
        />
        {filterInfo.hasNosePads.length !== 0 ? (
          <div>
            {filterInfo.hasNosePads.map((option) => (
              <Button
                name="hasNosePads"
                value={option}
                key={option}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {option}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
        <CheckBoxInput
          name="itemType"
          id="itemType"
          label="Item Type"
          options={[
            { text: "Sunglasses", value: "Sunglasses" },
            { text: "Eyeglasses", value: "Eyeglasses" },
          ]}
          onChange={onChange}
          selected={filterInfo.hasNosePads}
        />
        {filterInfo.itemType.length !== 0 ? (
          <div>
            {filterInfo.itemType.map((type) => (
              <Button
                name="itemType"
                value={type}
                key={type}
                size="sm"
                outline
                color="danger"
                className="mx-2"
                onClick={removeFilter}
              >
                {type}
                <X />
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default React.memo(Filter);
