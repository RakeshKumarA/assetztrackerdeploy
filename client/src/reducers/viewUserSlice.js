import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  view: [],
  error: "",
};

export const viewUserSlice = createSlice({
  name: "viewusers",
  initialState,
  reducers: {
    view_users_request: (state) => {
      state.loading = true;
      state.useradded = {};
    },
    view_users_success: (state, action) => {
      state.loading = false;
      state.view = action.payload;
    },
    view_users_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  view_users_request,
  view_users_success,
  view_users_failure,
} = viewUserSlice.actions;

export const viewUsers = () => async (dispatch, getState) => {
  try {
    dispatch(view_users_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/users/view", config);

    if (data.status === 200) {
      dispatch(view_users_success(data.users));
    } else {
      dispatch(view_users_failure(data.message));
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
    dispatch(view_users_failure(error.message));
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

export const searchUsers = (name) => async (dispatch, getState) => {
  try {
    dispatch(view_users_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/users/search", { name }, config);

    if (data.status === 200) {
      if (data.noOfUsers > 0) {
        dispatch(view_users_success(data.user));
      } else {
        dispatch(view_users_failure("User Not Found"));
        dispatch(
          set_snackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: "User Not Found",
            snackbarSeverity: "error",
          })
        );
      }
    } else {
      dispatch(view_users_failure(data.message));
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
    dispatch(view_users_failure(error.message));
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

export const deleteUsers = (userid) => async (dispatch, getState) => {
  try {
    dispatch(view_users_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/users/remove", { userid }, config);

    if (data.status === 200) {
      dispatch(view_users_success(data.users));
    } else {
      dispatch(view_users_failure(data.message));
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
    dispatch(view_users_failure(error.message));
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

export default viewUserSlice.reducer;
