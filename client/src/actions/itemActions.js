import * as types from "./types";
import axios from "axios";
import { tokenConfiguration } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    const res = await axios.get("/api/items");
    dispatch({
      type: types.GET_ITEMS,
      items: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
  }
};

export const searchTerm = (keyword) => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    let res;
    let body;
    if (!keyword) {
      res = await axios.get("/api/items");
    } else {
      // body = JSON.stringify({ query: keyword });
      const options = {
        headers: { "Content-Type": "application/json" },
      };
      body = JSON.stringify({ query: keyword });
      res = await axios.post("/api/items/search", body, options);
    }
    dispatch({
      type: types.SEARCH_ITEMS,
      items: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
  }
};

export const deleteItem = (itemId) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `/api/items/${itemId}`,
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.DELETE_ITEM,
      itemId: itemId,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
  }
};

export const addItem = (newItem, newFile = null) => async (
  dispatch,
  getState
) => {
  try {
    if (newFile) {
      const imgResponse = await axios.post(
        process.env.REACT_APP_CLOUDINARY_API,
        newFile
      );
      newItem.imageURL = imgResponse.data.secure_url;
    }

    const body = JSON.stringify(newItem);
    const res = await axios.post(
      "/api/items",
      body,
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.ADD_ITEM,
      newItem: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
    dispatch({
      type: types.ADD_ITEM_FAIL,
    });
  }
};

export const uploadItemImg = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/rainforss/image/upload",
      data
    );
    dispatch({
      type: types.UPLOAD_IMAGE,
      response: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
    dispatch({
      type: types.UPLOAD_IMAGE_FAIL,
    });
  }
};

export const updateItem = (updatedItem, itemId) => async (
  dispatch,
  getState
) => {
  try {
    const body = JSON.stringify(updatedItem);
    const res = await axios.put(
      `api/items/${itemId}`,
      body,
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.UPDATE_ITEM,
      updatedItem: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
    dispatch({
      type: types.UPDATE_ITEM_FAIL,
    });
  }
};

export const resetStatus = () => {
  return {
    type: types.RESET_ADD_STATUS,
  };
};

export const setItemsLoading = () => {
  return {
    type: types.ITEMS_LOADING,
  };
};
