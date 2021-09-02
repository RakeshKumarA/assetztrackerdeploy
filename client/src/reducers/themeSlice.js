import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light" };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    theme_update: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
  },
});

export const { theme_update } = themeSlice.actions;

export default themeSlice.reducer;
