import * as types from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  registerSuccess: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.response,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", action.response.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.response,
      };
    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        registerSuccess: false,
      };

    default:
      return state;
  }
}
