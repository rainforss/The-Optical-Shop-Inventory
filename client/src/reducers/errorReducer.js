import * as types from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        msg: action.response.msg,
        status: action.response.status,
        id: action.response.id,
      };
    case types.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
