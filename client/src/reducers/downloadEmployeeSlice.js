import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  error: "",
};

export const downloadEmployeeSlice = createSlice({
  name: "downloademployees",
  initialState,
  reducers: {
    download_employees_request: (state) => {
      state.loading = true;
    },
    download_employees_success: (state) => {
      state.loading = false;
    },
    download_employees_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  download_employees_request,
  download_employees_success,
  download_employees_failure,
} = downloadEmployeeSlice.actions;

export const downloadEmployees = (id) => async (dispatch, getState) => {
  try {
    dispatch(download_employees_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/employee/downemp", { id }, config);
    if (data.status === 200) {
      dispatch(download_employees_success());
      const columns = [
        { header: "Employee ID", key: "empid" },
        { header: "Employee Name", key: "empname" },
        { header: "Country Code", key: "countrycode" },
      ];

      const workSheetName = "employees";
      const fileName = "employees";
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(workSheetName);
      worksheet.columns = columns;
      worksheet.getRow(1).font = { bold: true };
      worksheet.columns.forEach((column) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: "center" };
      });
      data.employees.forEach((singleData) => {
        worksheet.addRow(singleData);
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } else {
      dispatch(download_employees_failure(data.message));
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
    dispatch(download_employees_failure(error.message));
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

export default downloadEmployeeSlice.reducer;
