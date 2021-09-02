import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboard: {
    assetId: {
      lable: "Asset Id",
      value: "",
    },
    assetStatus: {
      lable: "Asset Status",
      value: "Onboarding",
    },
    assetType: {
      lable: "Asset Type",
      value: "Computer",
    },
    assetClassification: {
      lable: "Asset Classification",
      value: "",
    },
    cost: {
      lable: "Cost",
      value: "",
    },
    invoiceNumber: {
      lable: "Invoice Number",
      value: "",
    },
    putToUseDate: {
      lable: "Put To Use Date",
      value: null,
    },
    invoiceDate: {
      lable: "Invoice Date",
      value: null,
    },
    model: {
      lable: "Model",
      value: "",
    },
    purchaseOrderDate: {
      lable: "Purchase Order Date",
      value: null,
    },
    purchaseOrder: {
      lable: "Purchase Order",
      value: "",
    },
    vendor: {
      lable: "Vendor",
      value: "",
    },
    location: {
      lable: "Location",
      value: "",
    },
    purchaseDate: {
      lable: "Purchase Date",
      value: null,
    },
  },
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    onboard_update: (state, action) => {
      state.onboard = action.payload;
    },
    onboard_reset: (state) => initialState,
  },
});

export const { onboard_update, onboard_reset } = onboardSlice.actions;

export default onboardSlice.reducer;
