import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  useradded: {},
  error: "",
};

export const addUserSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    user_add_request: (state) => {
      state.loading = true;
      state.useradded = {};
    },
    user_add_sucess: (state, action) => {
      state.loading = false;
      state.useradded = action.payload;
    },
    user_add_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  user_add_request,
  user_add_sucess,
  user_add_failure,
} = addUserSlice.actions;

export const addUser = (email, name, password, role) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(user_add_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password, role },
      config
    );
    if (data.status === 201) {
      delete data.status;

      dispatch(user_add_sucess(data));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User Successfully Added",
          snackbarSeverity: "success",
        })
      );
    } else {
      dispatch(user_add_failure(data.message));
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
    dispatch(user_add_failure(error.message));
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

export default addUserSlice.reducer;
