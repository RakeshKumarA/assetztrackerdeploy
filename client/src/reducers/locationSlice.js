import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  locationList: [],
  error: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    location_request: (state) => {
      state.loading = true;
      state.locationList = [];
    },
    location_sucess: (state, action) => {
      state.loading = false;
      state.locationList = action.payload;
    },
    location_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { location_request, location_sucess, location_failure } =
locationSlice.actions;

export const location = () => async (dispatch, getState) => {
  try {
    dispatch(location_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/assets/assetlocation/", config);
    if (data.status === 200) {
      delete data.status;
      dispatch(location_sucess(data.location));
    } else {
      dispatch(location_failure(data.message));
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
    dispatch(location_failure(error.message));
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

export default locationSlice.reducer;
