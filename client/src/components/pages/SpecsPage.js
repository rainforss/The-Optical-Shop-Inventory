import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getShapes,
  addShape,
  deleteShape,
  updateShape,
  resetSpecStatus,
} from "../../actions/specActions";
import { clearErrors } from "../../actions/errorActions";
import ShapeList from "../ShapeList";
import { toast } from "react-toastify";
import validate from "../common/validation";

const SpecsPage = ({
  error,
  isAuthenticated,
  spec,
  getShapes,
  addShape,
  resetSpecStatus,
  deleteShape,
  updateShape,
  clearErrors,
}) => {
  const [shape, setShape] = useState({ value: "" });
  const [inputModified, setInputModified] = useState({});
  const [modal, setModal] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [clientErrors, setClientErrors] = useState({});
  const [currentShape, setCurrentShape] = useState({});
  const [inputMode, setInputMode] = useState(true);

  const onChange = (e) => {
    if (inputMode) {
      setShape({ ...shape, [e.target.name]: e.target.value });
    } else {
      setCurrentShape({ ...currentShape, [e.target.name]: e.target.value });
    }

    setInputModified({ ...inputModified, [e.target.name]: true });
  };

  const toggle = () => {
    if (modal) {
      clearErrors();
      setShape({ value: "" });
      setInputMode(true);
      setCurrentShape({});
      setInputModified({});
    }
    setModal(!modal);
  };
  const submit = () => {
    if (inputMode) {
      const errorFree = validate(shape, setClientErrors).Shape();
      if (!errorFree) return;
      addShape(shape);
    } else {
      const errorFree = validate(currentShape, setClientErrors).Shape();
      if (!errorFree) return;
      updateShape(currentShape);
    }
  };

  const modifyShape = (e) => {
    const shape = spec.frameShapes.find((shape) => shape._id === e.target.name);
    setCurrentShape(shape);
    setInputMode(false);
    setModal(true);
  };

  useEffect(() => {
    getShapes();
  }, []);
  useEffect(() => {
    if (inputMode) {
      validate(shape, setClientErrors).ShapeRealTime(inputModified);
    } else {
      validate(currentShape, setClientErrors).ShapeRealTime(inputModified);
    }
  }, [shape, currentShape]);

  useEffect(() => {
    if (error.id === "SPEC_ERROR") {
      setServerErrors({ msg: error.msg.msg });
    } else {
      setServerErrors({ msg: null });
    }
    if (modal) {
      if (spec.actionSuccess) {
        toast.success(
          `${
            inputMode
              ? "New shape has been added!"
              : "Change has been made successfully!"
          }`
        );
        resetSpecStatus();
        toggle();
      }
    }
  }, [error, modal, spec.actionSuccess]);

  useEffect(() => {
    toast.error(error.msg.msg);
  }, [error]);

  return (
    <div>
      <h2 className="py-4">Frame Specifications</h2>
      <ShapeList
        shapes={spec.frameShapes}
        loading={spec.loading}
        isAuthenticated={isAuthenticated}
        shapeValue={shape.value}
        onChange={onChange}
        submit={submit}
        deleteShape={(e) => deleteShape(e.target.name)}
        modal={modal}
        toggle={toggle}
        serverErrors={serverErrors}
        clientErrors={clientErrors}
        inputMode={inputMode}
        currentShape={currentShape}
        modifyShape={modifyShape}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
  spec: state.spec,
});

export default connect(mapStateToProps, {
  getShapes,
  addShape,
  deleteShape,
  updateShape,
  resetSpecStatus,
  clearErrors,
})(SpecsPage);
