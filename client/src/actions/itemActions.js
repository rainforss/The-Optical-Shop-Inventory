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
    dispatch(returnErrors(err.response.data, err.response.status));
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
    dispatch(returnErrors(err.response.data, err.response.status));
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
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: types.ITEMS_LOADING,
  };
};
