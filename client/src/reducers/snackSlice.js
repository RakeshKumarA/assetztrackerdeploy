import { createSlice } from "@reduxjs/toolkit";

export const snackSlice = createSlice({
  name: "snack",
  initialState: {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: "",
    snackbarSeverity: "success",
  },
  reducers: {
    set_snackbar: (state, action) => {
      const {
        snackbarOpen,
        snackbarMessage,
        snackbarType,
        snackbarSeverity,
      } = action.payload;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
        snackbarSeverity,
      };
    },
  },
});

export const { set_snackbar } = snackSlice.actions;

export default snackSlice.reducer;
