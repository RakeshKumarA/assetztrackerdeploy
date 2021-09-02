import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user_login_request: (state) => {
      state.loading = true;
      state.userInfo = {};
    },
    user_login_sucess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    user_login_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_logout: (state, action) => {
      localStorage.removeItem("userInfo");
      return initialState;
    },
  },
});

export const {
  user_login_request,
  user_login_sucess,
  user_login_failure,
  user_logout,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(user_login_request());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    if (data.status === 200) {
      delete data.status;

      dispatch(user_login_sucess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Sucessfully logged in",
          snackbarSeverity: "success",
        })
      );
    } else {
      dispatch(user_login_failure(data.message));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: data.message,
          snackbarSeverity: "error",
        })
      );
    }
  } catch (error) {
    dispatch(user_login_failure(error.message));
    dispatch(
      set_snackbar({
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: error.message,
        snackbarSeverity: "error",
      })
    );
  }
};

export default userSlice.reducer;
