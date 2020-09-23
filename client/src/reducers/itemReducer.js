import * as types from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  actionSuccess: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ITEMS:
      return {
        ...state,
        items: action.items,
        loading: false,
      };
    case types.SEARCH_ITEMS:
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
    case types.ADD_ITEM_FAIL:
      return {
        ...state,
        actionSuccess: false,
      };
    case types.ADD_ITEM:
      return {
        ...state,
        items: [action.newItem, ...state.items],
        actionSuccess: true,
      };
    case types.UPDATE_ITEM:
      const replaceIndex = state.items.findIndex(
        (item) => item._id === action.updatedItem._id
      );
      const items = [...state.items];
      items.splice(replaceIndex, 1, action.updatedItem);
      return {
        ...state,
        items: [...items],
        actionSuccess: true,
      };
    case types.UPDATE_ITEM_FAIL:
      return {
        ...state,
        actionSuccess: false,
      };
    case types.RESET_ADD_STATUS:
      return {
        ...state,
        actionSuccess: null,
      };
    case types.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
        items: [],
      };
    default:
      return state;
  }
}
