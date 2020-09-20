import axios from "axios";
import * as types from "./types";
import { returnErrors } from "./errorActions";

//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  //User loading
  dispatch({ type: types.USER_LOADING });

  try {
    const res = await axios.get(
      "/api/user/userinfo",
      tokenConfiguration(getState)
    );
    dispatch({
      type: types.USER_LOADED,
      response: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

//Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/user/register", body, config);
    dispatch({
      type: types.REGISTER_SUCCESS,
      response: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};

//Login
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/user/login", body, config);
    dispatch({
      type: types.LOGIN_SUCCESS,
      response: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
    );
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

//Logout
export const logout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

export const resetRegisterStatus = () => {
  return {
    type: types.RESET_REGISTER_STATUS,
  };
};

//Configure auth-token in the header if JWT token exists
export const tokenConfiguration = (getState) => {
  //Get the token from auth state tree
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["auth-token"] = token;
  }
  return config;
};
