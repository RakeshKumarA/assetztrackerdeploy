import { createSlice } from '@reduxjs/toolkit';

const initialState = { software: [] };

export const softwareSlice = createSlice({
  name: 'software',
  initialState,
  reducers: {
    software_update: (state, action) => {
      return {
        ...state,
        software: [action.payload, ...state.software],
      };
    },
    software_delete: (state, action) => {
      return {
        ...state,
        software: state.software.filter(
          (software) => software.id !== action.payload
        ),
      };
    },
    software_update_for_edit: (state, action) => {
      state.software = action.payload
    },
    software_reset: (state) => initialState,
  },
});

export const {
  software_update,
  software_update_for_edit,
  software_delete,
  software_reset,
} = softwareSlice.actions;

export default softwareSlice.reducer;
