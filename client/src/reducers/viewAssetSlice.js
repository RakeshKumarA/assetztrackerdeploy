import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  assets: [],
  error: "",
};

export const viewAssetSlice = createSlice({
  name: "viewassets",
  initialState,
  reducers: {
    view_assets_request: (state) => {
      state.loading = true;
    },
    view_assets_success: (state, action) => {
      state.loading = false;
      state.assets = action.payload;
    },
    view_assets_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { view_assets_request, view_assets_success, view_assets_failure } =
  viewAssetSlice.actions;

export const viewAssets = () => async (dispatch, getState) => {
  try {
    dispatch(view_assets_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/assets/viewassets", config);
    if (data.status === 200) {
      if (data.length === 0) {
        dispatch(
          set_snackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: "No asset added",
            snackbarSeverity: "error",
          })
        );
      }

      dispatch(view_assets_success(data.assets));
    } else {
      dispatch(view_assets_failure(data.message));
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
    dispatch(view_assets_failure(error.message));
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

export const searchAsset = (assetId) => async (dispatch, getState) => {
  try {
    dispatch(view_assets_request());
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
      "/api/assets/searchAsset",
      { assetId },
      config
    );
    if (data.status === 200) {
      if (data.noOfAssets === 0) {
        dispatch(
          set_snackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: "Asset Not Found",
            snackbarSeverity: "error",
          })
        );
      }
      dispatch(view_assets_success(data.asset));
    } else {
      dispatch(view_assets_failure(data.message));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Asset Not Found",
          snackbarSeverity: "error",
        })
      );
    }
  } catch (error) {
    dispatch(view_assets_failure(error.message));
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

export default viewAssetSlice.reducer;
