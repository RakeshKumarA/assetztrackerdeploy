import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  option: 1,
  enable: {
    onboard: false,
    software: true,
    hardware: true,
    depreciation: true,
    documents: true,
  },
};

export const assetSelSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    option_update_continue: (state, action) => {
      state.option = action.payload.option;
      state.enable = action.payload.enable;
    },
    option_update_onclick: (state, action) => {
      state.option = action.payload.option;
    },
    option_update_reset: (state) => initialState,
  },
});

export const {
  option_update_continue,
  option_update_onclick,
  option_update_reset,
} = assetSelSlice.actions;

export default assetSelSlice.reducer;
