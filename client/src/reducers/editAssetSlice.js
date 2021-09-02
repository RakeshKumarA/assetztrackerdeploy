import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { depreciation_update } from "./depreciationSlice";
import { hardware_update_for_edit } from "./hardwareSlice";
import { onboard_update } from "./onboardSlice";

import { set_snackbar } from "./snackSlice";
import { software_update_for_edit } from "./softwareSlice";

const initialState = {
  loading: false,
  editassetid: null,
  error: "",
};

export const editAssetSlice = createSlice({
  name: "editAsset",
  initialState,
  reducers: {
    edit_asset_request: (state) => {
      state.loading = true;
    },
    edit_asset_sucess: (state, action) => {
      state.loading = false;
      state.editassetid = action.payload
    },
    edit_asset_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { edit_asset_request, edit_asset_sucess, edit_asset_failure } =
  editAssetSlice.actions;

export const geteditAsset = (id, action) => async (dispatch, getState) => {
  try {
    dispatch(edit_asset_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/assets/asset/${id}`, config);
    if (data.status === 200) {
      delete data.status;
      if (action === 'clone') {
        const newOnboard = {
          ...data.assetbyid[0].onboard,
          assetId: {
            lable: "Asset Id",
            value: "",
          },
        }
        dispatch(onboard_update(newOnboard))
      } else {
        dispatch(onboard_update(data.assetbyid[0].onboard))  
      }
      dispatch(software_update_for_edit(data.assetbyid[0].software))
      dispatch(hardware_update_for_edit(data.assetbyid[0].hardware))
      dispatch(depreciation_update(data.assetbyid[0].depreciation))
      dispatch(edit_asset_sucess(id));
    } else {
      dispatch(edit_asset_failure(data.message));
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
    dispatch(edit_asset_failure(error.message));
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

export default editAssetSlice.reducer;
