import * as types from "./types";
import axios from "axios";
import { tokenConfiguration } from "./authActions";
import { returnErrors } from "./errorActions";

export const getShapes = () => async (dispatch) => {
  dispatch(setShapesLoading());

  try {
    const res = await axios.get("/api/framespecs/frameshapes");
    dispatch({
      type: types.GET_FRAME_SHAPES,
      frameShapes: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "SPEC_ERROR")
    );
  }
};

export const addShape = (newShape) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify(newShape);
    console.log(body);
    const { data: savedShape } = await axios.post(
      "/api/framespecs/frameshapes",
      body,
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.ADD_SHAPE,
      shape: savedShape,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "SPEC_ERROR")
    );
    dispatch({
      type: types.ADD_SHAPE_FAIL,
    });
  }
};

export const deleteShape = (shapeId) => async (dispatch, getState) => {
  try {
    const { data: deletedShape } = await axios.delete(
      `/api/framespecs/frameshapes/${shapeId}`,
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.DELETE_SHAPE,
      shape: deletedShape,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_RELATED_ERROR")
    );
    dispatch({
      type: types.DELETE_SHAPE_FAIL,
    });
  }
};

export const updateShape = (updateShape) => async (dispatch, getState) => {
  const { value, text } = updateShape;
  const body = JSON.stringify({ value, text });
  try {
    const { data: updatedShape } = await axios.put(
      `/api/framespecs/frameshapes/${updateShape._id}`,
      body,
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.UPDATE_SHAPE,
      shape: updatedShape,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "SPEC_ERROR")
    );
    dispatch({
      type: types.UPDATE_SHAPE_FAIL,
    });
  }
};

export const setShapesLoading = () => {
  return {
    type: types.SHAPES_LOADING,
  };
};

export const resetSpecStatus = () => {
  return {
    type: types.RESET_SPEC_STATUS,
  };
};
