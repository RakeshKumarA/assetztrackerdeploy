import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  submitBulkAsset: [],
  error: "",
};

export const submitBulkAssetSlice = createSlice({
  name: "submitBulkAsset",
  initialState,
  reducers: {
    submit_bulk_asset_request: (state) => {
      state.loading = true;
      state.submitBulkAsset = [];
    },
    submit_bulk_asset_success: (state, action) => {
      state.loading = false;
      state.submitBulkAsset = action.payload;
    },
    submit_bulk_asset_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submit_bulk_asset_request,
  submit_bulk_asset_success,
  submit_bulk_asset_failure,
} = submitBulkAssetSlice.actions;

export const addbulkAsset = (assets) => async (dispatch, getState) => {
  try {
    dispatch(submit_bulk_asset_request());
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
      "/api/assets/bulkassets",
      { assets },
      config
    );
    if (data.status === 201) {
      delete data.status;

      dispatch(submit_bulk_asset_success(data.assets));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Asset Successfully Added",
          snackbarSeverity: "success",
        })
      );
    } else {
      dispatch(submit_bulk_asset_failure(data.message));
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
    dispatch(submit_bulk_asset_failure(error.message));
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

export default submitBulkAssetSlice.reducer;
