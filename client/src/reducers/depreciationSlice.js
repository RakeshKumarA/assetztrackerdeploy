import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  depreciation: {
    shelflife: {
      lable: 'Shelf Life',
      value: '',
    },
    residualvalue: {
      lable: 'Residual Value',
      value: '',
    },
    depmethod: {
      lable: 'Depreciation Method',
      value: '',
    },
  },
};

export const depreciationSlice = createSlice({
  name: 'depreciation',
  initialState,
  reducers: {
    depreciation_update: (state, action) => {
      state.depreciation = action.payload;
    },
    depreciation_reset: (state) => initialState,
  },
});

export const {
  depreciation_update,
  depreciation_reset,
} = depreciationSlice.actions;

export default depreciationSlice.reducer;
