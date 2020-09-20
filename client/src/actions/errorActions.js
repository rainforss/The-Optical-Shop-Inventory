import * as types from "./types";

export const returnErrors = (msg, status, id = null) => {
  return {
    type: types.GET_ERRORS,
    response: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};
