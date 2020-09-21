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

export const addItem = (newItem) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "/api/items",
      newItem,
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

export const updateItem = (updatedItem, itemId) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.put(
      `api/items/${itemId}`,
      updatedItem,
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
