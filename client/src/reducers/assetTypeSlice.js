import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  assetType: [],
  error: "",
};

export const assetTypeSlice = createSlice({
  name: "assetType",
  initialState,
  reducers: {
    asset_type_request: (state) => {
      state.loading = true;
      state.assetType = [];
    },
    asset_type_sucess: (state, action) => {
      state.loading = false;
      state.assetType = action.payload;
    },
    asset_type_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { asset_type_request, asset_type_sucess, asset_type_failure } =
  assetTypeSlice.actions;

export const getAssetType = () => async (dispatch, getState) => {
  try {
    dispatch(asset_type_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/assets/assettype/", config);
    if (data.status === 200) {
      delete data.status;
      dispatch(asset_type_sucess(data.assettype));
    } else {
      dispatch(asset_type_failure(data.message));
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
    dispatch(asset_type_failure(error.message));
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

export default assetTypeSlice.reducer;
