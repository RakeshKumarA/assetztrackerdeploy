import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  stats: {
    assetsCountByStatus: [],
    assetsCountByCategory: [],
    assetsCountByPeriod: []
  },
  assetsFilterList: [],
  error: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    dashboard_request: (state) => {
      state.loading = true;
      state.dashboard = {};
    },
    dashboard_chart_sucess: (state, action) => {
      state.loading = false;
      state.stats.assetsCountByStatus = action.payload.assetsCountByStatus;
      state.stats.assetsCountByCategory = action.payload.assetsCountByCategory;
      state.stats.assetsCountByPeriod = action.payload.assetsCountByPeriod;
    },
    dashboard_table_sucess: (state, action) => {
      state.loading = false;
      state.assetsFilterList = action.payload;
    },
    dashboard_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  dashboard_request,
  dashboard_chart_sucess,
  dashboard_table_sucess,
  dashboard_failure,
} = dashboardSlice.actions;

export const dashboardChart = () => async (dispatch, getState) => {
  try {
    dispatch(dashboard_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/dashboard", config);
    if (data.status === 200) {
      delete data.status;

      dispatch(dashboard_chart_sucess(data.stats));
    } else {
      dispatch(dashboard_failure(data.message));
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
    dispatch(dashboard_failure(error.message));
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

export const dashboardTable =
  (assetFilterCriteria) => async (dispatch, getState) => {
    try {
      dispatch(dashboard_request());
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (assetFilterCriteria.type === "assetByStatus") {
        const { data } = await axios.post(
          "/api/dashboard/abs",
          { assetByStatus: assetFilterCriteria.criteria },
          config
        );
        if (data.status === 200) {
          delete data.status;

          dispatch(dashboard_table_sucess(data.assets));
        } else {
          dispatch(dashboard_failure(data.message));
          dispatch(
            set_snackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: data.message,
              snackbarSeverity: "error",
            })
          );
        }
      } else if (assetFilterCriteria.type === "assetByCategory") {
        const { data } = await axios.post(
          "/api/dashboard/abc",
          { assetByCategory: assetFilterCriteria.criteria },
          config
        );
        if (data.status === 200) {
          delete data.status;

          dispatch(dashboard_table_sucess(data.assets));
        } else {
          dispatch(dashboard_failure(data.message));
          dispatch(
            set_snackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: data.message,
              snackbarSeverity: "error",
            })
          );
        }
      } else if (assetFilterCriteria.type === "assetByPeriod") {
        const { data } = await axios.post(
          "/api/dashboard/abp",
          { assetByPeriod: assetFilterCriteria.criteria },
          config
        );
        if (data.status === 200) {
          delete data.status;

          dispatch(dashboard_table_sucess(data.assets));
        } else {
          dispatch(dashboard_failure(data.message));
          dispatch(
            set_snackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: data.message,
              snackbarSeverity: "error",
            })
          );
        }
      }
    } catch (error) {
      dispatch(dashboard_failure(error.message));
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

export default dashboardSlice.reducer;
