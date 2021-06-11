import * as types from "./types";
import axios from "axios";
import { tokenConfiguration } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = (query, clear) => async (dispatch) => {
  dispatch(setItemsLoading(clear));
  const filters = { ...query };

  try {
    const res = await axios.get("/api/items", {
      params: filters,
    });
    dispatch({
      type: types.GET_ITEMS,
      items: res.data.items,
      count: res.data.count,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
  }
};

// export const searchTerm = (keyword) => async (dispatch) => {
//   dispatch(setItemsLoading());
//   try {
//     let res;
//     let body;
//     if (!keyword) {
//       res = await axios.get("/api/items");
//     } else {
//       // body = JSON.stringify({ query: keyword });
//       const options = {
//         headers: { "Content-Type": "application/json" },
//       };
//       body = JSON.stringify({ query: keyword });
//       res = await axios.post("/api/items/search", body, options);
//     }
//     dispatch({
//       type: types.SEARCH_ITEMS,
//       items: res.data,
//     });
//   } catch (err) {
//     dispatch(
//       returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
//     );
//   }
// };

export const deleteItem = (itemId, imgIds) => async (dispatch, getState) => {
  try {
    const imageIds = { ...imgIds };
    const res = await axios.delete(`/api/items/${itemId}`, {
      params: imageIds,
      ...tokenConfiguration(getState),
    });
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

export const addItem = (newItem, images) => async (dispatch, getState) => {
  const specialChars = [`&`, `'`];
  try {
    if (images.front) {
      newItem.hasFront = true;
    } else {
      newItem.hasFront = false;
    }
    if (images.side) {
      newItem.hasSide = true;
    } else {
      newItem.hasSide = false;
    }

    let body = JSON.stringify(newItem);
    let item = await axios.post(
      "/api/items",
      body,
      tokenConfiguration(getState)
    );

    let versions = {};
    let imageURLs = [];
    if (images.front) {
      const formData = new FormData();
      formData.append("file", images.front);

      formData.append("upload_preset", "opticalshop");
      formData.append(
        "public_id",
        specialChars.some((el) => newItem.name.includes(el))
          ? `${encodeURIComponent(newItem.name)}AND${encodeURIComponent(
              newItem.barcode
            )}FRONT`
          : `${newItem.name}AND${newItem.barcode}FRONT`
      );
      formData.append("cloud_name", "rainforss");
      const front = await axios.post(
        "https://api.cloudinary.com/v1_1/rainforss/image/upload",
        formData
      );
      versions.frontImageVersion = front.data.version;
      imageURLs.push({ src: front.data.secure_url });
    }
    if (images.side) {
      const formData = new FormData();
      formData.append("file", images.side);

      formData.append("upload_preset", "opticalshop");
      formData.append(
        "public_id",
        specialChars.some((el) => newItem.name.includes(el))
          ? `${encodeURIComponent(newItem.name)}AND${encodeURIComponent(
              newItem.barcode
            )}SIDE`
          : `${newItem.name}AND${newItem.barcode}SIDE`
      );
      formData.append("cloud_name", "rainforss");
      const side = await axios.post(
        "https://api.cloudinary.com/v1_1/rainforss/image/upload",
        formData
      );
      versions.sideImageVersion = side.data.version;
      imageURLs.push({ src: side.data.secure_url });
    }
    body = JSON.stringify(versions);
    const res = await axios.put(
      `/api/items/${item.data._id}/version`,
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

export const updateItem =
  (updatedItem, itemImage, itemId) => async (dispatch, getState) => {
    const specialChars = [`&`, `'`];
    try {
      //If new item image is attached, upload the new image to Cloudinary and notify the server to destroy old image
      if (itemImage.front) {
        //Get Cloudinary authentication string from the server and post image to Cloudinary
        const info = JSON.stringify({
          public_id: specialChars.some((el) => updatedItem.name.includes(el))
            ? `${encodeURIComponent(updatedItem.name)}AND${encodeURIComponent(
                updatedItem.barcode
              )}FRONT`
            : `${updatedItem.name}AND${updatedItem.barcode}FRONT`,
        });
        const authenticate = await axios.post(
          "api/user/getsignature",
          info,
          tokenConfiguration(getState)
        );
        const newFile = new FormData();
        newFile.append("file", itemImage.front);
        newFile.append(
          "public_id",
          specialChars.some((el) => updatedItem.name.includes(el))
            ? `${encodeURIComponent(updatedItem.name)}AND${encodeURIComponent(
                updatedItem.barcode
              )}FRONT`
            : `${updatedItem.name}AND${updatedItem.barcode}FRONT`
        );
        newFile.append("api_key", "334344196228832");
        newFile.append("timestamp", authenticate.data.timestamp);
        newFile.append("signature", authenticate.data.signature);
        const image = await axios.post(
          "https://api.cloudinary.com/v1_1/rainforss/image/upload",
          newFile
        );
        updatedItem.hasFront = true;
        updatedItem.frontImageVersion = image.data.version;
      }

      if (itemImage.side) {
        const info = JSON.stringify({
          public_id: specialChars.some((el) => updatedItem.name.includes(el))
            ? `${encodeURIComponent(updatedItem.name)}AND${encodeURIComponent(
                updatedItem.barcode
              )}SIDE`
            : `${updatedItem.name}AND${updatedItem.barcode}SIDE`,
        });
        const authenticate = await axios.post(
          "api/user/getsignature",
          info,
          tokenConfiguration(getState)
        );
        const newFile = new FormData();
        newFile.append("file", itemImage.side);
        newFile.append(
          "public_id",
          specialChars.some((el) => updatedItem.name.includes(el))
            ? `${encodeURIComponent(updatedItem.name)}AND${encodeURIComponent(
                updatedItem.barcode
              )}SIDE`
            : `${updatedItem.name}AND${updatedItem.barcode}SIDE`
        );
        newFile.append("api_key", "334344196228832");
        newFile.append("timestamp", authenticate.data.timestamp);
        newFile.append("signature", authenticate.data.signature);
        const image = await axios.post(
          "https://api.cloudinary.com/v1_1/rainforss/image/upload",
          newFile
        );
        updatedItem.hasSide = true;
        updatedItem.sideImageVersion = image.data.version;
      }

      const body = JSON.stringify(updatedItem);
      const res = await axios.put(
        `api/items/${itemId}`,
        body,
        tokenConfiguration(getState)
      );

      //Collect response and dispatch action
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

export const setItemsLoading = (clear) => {
  return {
    type: types.ITEMS_LOADING,
    clear: clear,
  };
};
