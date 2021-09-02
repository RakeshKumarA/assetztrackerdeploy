import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  employeeViewed: [],
  employeeSearched: [],
  error: "",
};

export const employeeSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    employee_request: (state) => {
      state.loading = true;
      state.employeeViewed = [];
      state.employeeSearched = [];
    },
    employee_add_sucess: (state) => {
      state.loading = false;
    },
    employee_view_sucess: (state, action) => {
      state.loading = false;
      state.employeeViewed = action.payload;
    },
    employee_search_sucess: (state, action) => {
      state.loading = false;
      state.employeeSearched = action.payload;
    },
    employee_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    employee_cleanup: (state) => {
      state.loading = false;
      state.employeeadded = [];
    },
  },
});

export const {
  employee_request,
  employee_add_sucess,
  employee_view_sucess,
  employee_search_sucess,
  employee_failure,
  employee_cleanup,
} = employeeSlice.actions;

export const addEmployee = (employees) => async (dispatch, getState) => {
  try {
    dispatch(employee_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/employee", { employees }, config);
    if (data.status === 201) {
      delete data.status;

      dispatch(employee_add_sucess());
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Employee/s Successfully Added",
          snackbarSeverity: "success",
        })
      );
    } else {
      dispatch(employee_failure(data.message));
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
    dispatch(employee_failure(error.message));
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

export const viewEmployee = () => async (dispatch, getState) => {
  try {
    dispatch(employee_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/employee/view", config);
    if (data.status === 200) {
      delete data.status;

      dispatch(employee_view_sucess(data.employees));
    } else {
      dispatch(employee_failure(data.message));
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
    dispatch(employee_failure(error.message));
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

export const viewEmployeeToAssign = () => async (dispatch, getState) => {
  try {
    dispatch(employee_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/employee/viewtoassign", config);
    if (data.status === 200) {
      delete data.status;

      dispatch(employee_view_sucess(data.employees));
    } else {
      dispatch(employee_failure(data.message));
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
    dispatch(employee_failure(error.message));
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

export const assignEmployeeToAsset =
  (assignEmployee) => async (dispatch, getState) => {
    try {
      dispatch(employee_request());
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
        "/api/employee/assignEmp",
        { assignEmployee },
        config
      );
      if (data.status === 200) {
        dispatch(
          set_snackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "Asset successfully assigned",
            snackbarSeverity: "success",
          })
        );
      } else {
        dispatch(employee_failure(data.message));
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
      dispatch(employee_failure(error.message));
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

export const unAssignAsset = (assetid, reason, method) => async (dispatch, getState) => {
  try {
    dispatch(employee_request());
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
      "/api/employee/unassignemp",
      { assetid, reason, method },
      config
    );
    if (data.status === 200) {
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Asset successfully unassigned",
          snackbarSeverity: "success",
        })
      );
    } else {
      dispatch(employee_failure(data.message));
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
    dispatch(employee_failure(error.message));
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

export default employeeSlice.reducer;
