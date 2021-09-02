import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assetOperation: 'Add',
};

export const assetOperationSlice = createSlice({
  name: "assetOperation",
  initialState,
  reducers: {
    
    asset_operation: (state, action) => {
      state.assetOperation = action.payload;
    },
    asset_operation_reset: (state) => initialState,
  },
});

export const { asset_operation } =
  assetOperationSlice.actions;

export default assetOperationSlice.reducer;
