import React from "react";
import { Button } from "reactstrap";
import CheckBoxInput from "./common/CheckBoxInput";

const Filter = ({
  onChange,
  filterOpen,
  toggleFilter,
  applyFilter,
  filterInfo,
}) => {
  console.log("filter render");
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
      </div>
    </>
  );
};

export default Filter;
