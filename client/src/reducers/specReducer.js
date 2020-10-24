import * as types from "../actions/types";

const initialState = {
  frameShapes: [],
  loading: false,
  actionSuccess: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_FRAME_SHAPES:
      return {
        ...state,
        frameShapes: [...action.frameShapes],
        loading: false,
      };
    case types.SHAPES_LOADING:
      return {
        ...state,
        frameShapes: [],
        loading: true,
      };

    case types.ADD_SHAPE:
      return {
        ...state,
        frameShapes: [...state.frameShapes, action.shape],
        actionSuccess: true,
      };

    case types.ADD_SHAPE_FAIL:
      return {
        ...state,
        actionSuccess: false,
      };

    case types.DELETE_SHAPE:
      return {
        ...state,
        frameShapes: state.frameShapes.filter(
          (shape) => shape._id !== action.shape._id
        ),
        actionSuccess: true,
      };
    case types.DELETE_SHAPE_FAIL:
      return {
        ...state,
        actionSuccess: false,
      };
    case types.UPDATE_SHAPE:
      const replaceIndex = state.frameShapes.findIndex(
        (shape) => shape._id === action.shape._id
      );
      const shapes = [...state.frameShapes];
      shapes.splice(replaceIndex, 1, action.shape);
      return {
        ...state,
        frameShapes: shapes,
        actionSuccess: true,
      };
    case types.UPDATE_SHAPE_FAIL:
      return {
        ...state,
        actionSuccess: false,
      };
    case types.RESET_SPEC_STATUS:
      return {
        ...state,
        actionSuccess: null,
      };

    default:
      return state;
  }
}
