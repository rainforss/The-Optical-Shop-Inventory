import * as types from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ITEMS:
      return {
        ...state,
        items: action.items,
        loading: false,
      };
    case types.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.itemId),
      };
    case types.ADD_ITEM:
      return {
        ...state,
        items: [action.newItem, ...state.items],
      };
    case types.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
