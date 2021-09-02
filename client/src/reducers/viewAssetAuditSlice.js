import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  assetaudit: [],
  error: "",
};

export const viewAssetAuditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    view_assetaudit_request: (state) => {
      state.loading = true;
    },
    view_assetaudit_success: (state, action) => {
      state.loading = false;
      state.assetaudit = action.payload;
    },
    view_assetaudit_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  view_assetaudit_request,
  view_assetaudit_success,
  view_assetaudit_failure,
} = viewAssetAuditSlice.actions;

export const viewAssetAudit = (id) => async (dispatch, getState) => {
  try {
    dispatch(view_assetaudit_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/assets/assetaudit/${id}`, config);
    if (data.status === 200) {
      dispatch(view_assetaudit_success(data.assettransaction));
    } else {
      dispatch(view_assetaudit_failure(data.message));
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
    dispatch(view_assetaudit_failure(error.message));
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

export default viewAssetAuditSlice.reducer;
