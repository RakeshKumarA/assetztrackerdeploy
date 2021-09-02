import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  error: "",
};

export const downloadAssetSlice = createSlice({
  name: "downloadassets",
  initialState,
  reducers: {
    download_assets_request: (state) => {
      state.loading = true;
    },
    download_assets_success: (state) => {
      state.loading = false;
    },
    download_assets_audit_success: (state) => {
      state.loading = false;
    },
    download_assets_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  download_assets_request,
  download_assets_success,
  download_assets_audit_success,
  download_assets_failure,
} = downloadAssetSlice.actions;

export const downloadAssets = (id) => async (dispatch, getState) => {
  try {
    dispatch(download_assets_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/assets/downlAsset", { id }, config);
    if (data.status === 200) {
      dispatch(download_assets_success());
      const columns = [
        { header: "Asset ID", key: "assetId" },
        { header: "Asset Status", key: "assetStatus" },
        { header: "Asset Type", key: "assetType" },
        { header: "Cost", key: "cost" },
        { header: "Invoice Number", key: "invoiceNumber" },
        { header: "Invoice Date", key: "invoiceDate" },
        { header: "Model", key: "model" },
        { header: "Purchase Order Date", key: "purchaseOrderDate" },
        { header: "Purchase Order", key: "purchaseOrder" },
        { header: "Vendor", key: "vendor" },
        { header: "Location", key: "location" },
        { header: "Purchase Date", key: "purchaseDate" },
        { header: "Asset Added By", key: "name" },
      ];

      const workSheetName = "assets";
      const fileName = "Assets";
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(workSheetName);
      worksheet.columns = columns;
      worksheet.getRow(1).font = { bold: true };
      worksheet.columns.forEach((column) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: "center" };
      });
      console.log(data)
      data.assets.forEach((singleData) => {
        worksheet.addRow(singleData);
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } else {
      dispatch(download_assets_failure(data.message));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Asset Not Found",
          snackbarSeverity: "error",
        })
      );
    }
  } catch (error) {
    dispatch(download_assets_failure(error.message));
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

export const downloadAssetsAudit = (id) => async (dispatch, getState) => {
  try {
    dispatch(download_assets_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/assets/downlAssetAudit", { id }, config);
    if (data.status === 200) {
      dispatch(download_assets_audit_success());
      console.log(data)
      const columns = [
        { header: "Asset ID", key: "assetid" },
        { header: "Employee Name", key: "empname" },
        { header: "User Name", key: "name" },
        { header: "Transaction Type", key: "transactiontype" },
        { header: "Transaction Date", key: "transactiondate" },
        { header: "Transaction Reason", key: "transactionreason" },
        { header: "Transaction Method", key: "transactionmethod" },
      ];

      const workSheetName = "assetaudit";
      const fileName = "AssetsAudit";
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(workSheetName);
      worksheet.columns = columns;
      worksheet.getRow(1).font = { bold: true };
      worksheet.columns.forEach((column) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: "center" };
      });
      data.assetsaudit.forEach((singleData) => {
        worksheet.addRow(singleData);
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } else {
      dispatch(download_assets_failure(data.message));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Asset Not Found",
          snackbarSeverity: "error",
        })
      );
    }
  } catch (error) {
    dispatch(download_assets_failure(error.message));
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

export default downloadAssetSlice.reducer;
