import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { option_update_reset } from "./assetSelSlice";
import { depreciation_reset } from "./depreciationSlice";
import { hardware_reset } from "./hardwareSlice";
import { onboard_reset } from "./onboardSlice";

import { set_snackbar } from "./snackSlice";
import { software_reset } from "./softwareSlice";

const initialState = {
  loading: false,
  submitAsset: {},
  error: "",
};

export const submitAssetSlice = createSlice({
  name: "submitAsset",
  initialState,
  reducers: {
    submit_asset_request: (state) => {
      state.loading = true;
      state.submitAsset = {};
    },
    submit_asset_success: (state, action) => {
      state.loading = false;
      state.submitAsset = action.payload;
    },
    submit_asset_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submit_asset_request,
  submit_asset_success,
  submit_asset_failure,
} = submitAssetSlice.actions;

export const addAsset = (onboard, software, hardware, depreciation) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(submit_asset_request());
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
      "/api/assets",
      { onboard, software, hardware, depreciation},
      config
    );
    if (data.status === 201) {
      delete data.status;

      dispatch(submit_asset_success(data));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Asset Successfully Added",
          snackbarSeverity: "success",
        })
      );
      dispatch(onboard_reset());
      dispatch(software_reset());
      dispatch(hardware_reset());
      dispatch(depreciation_reset());
      dispatch(option_update_reset());
    } else {
      dispatch(submit_asset_failure(data.message));
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
    dispatch(submit_asset_failure(error.message));
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

export const editAsset = (assetid, onboard, software, hardware, depreciation) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(submit_asset_request());
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
      "/api/assets/editAsset",
      { assetid, onboard, software, hardware, depreciation},
      config
    );
    if (data.status === 200) {
      delete data.status;

      dispatch(submit_asset_success(data));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Asset Successfully Edited",
          snackbarSeverity: "success",
        })
      );
      dispatch(onboard_reset());
      dispatch(software_reset());
      dispatch(hardware_reset());
      dispatch(depreciation_reset());
      dispatch(option_update_reset());
    } else {
      dispatch(submit_asset_failure(data.message));
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
    dispatch(submit_asset_failure(error.message));
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

export default submitAssetSlice.reducer;
