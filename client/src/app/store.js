import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import snackReducer from "../reducers/snackSlice";
import addUserReducer from "../reducers/addUserSlice";
import viewUserReducer from "../reducers/viewUserSlice";
import onboardReducer from "../reducers/onboardSlice";
import assetSelReducer from "../reducers/assetSelSlice";
import softwareReducer from "../reducers/softwareSlice";
import hardwareReducer from "../reducers/hardwareSlice";
import depreciationReducer from "../reducers/depreciationSlice";
import themeReducer from "../reducers/themeSlice";
import assetsReducer from "../reducers/viewAssetSlice";
import downloadReducer from "../reducers/downloadAssetSlice";
import submitReducer from "../reducers/submitAssetSlice";
import submitBulkReducer from "../reducers/submitBulkAssetSlice";
import dashboardReducer from "../reducers/dashboardSlice";
import employeeReducer from "../reducers/employeeSlice";
import assetTypeReducer from "../reducers/assetTypeSlice";
import locationReducer from "../reducers/locationSlice";
import assetAuditReducer from "../reducers/viewAssetAuditSlice";
import assetOperationReducer from "../reducers/assetOperationSlice";
import editAssetReducer from "../reducers/editAssetSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
    addUser: addUserReducer,
    viewUser: viewUserReducer,
    onboard: onboardReducer,
    assetSel: assetSelReducer,
    software: softwareReducer,
    hardware: hardwareReducer,
    depreciation: depreciationReducer,
    viewAsset: assetsReducer,
    theme: themeReducer,
    download: downloadReducer,
    submit: submitReducer,
    submitBulk: submitBulkReducer,
    dashboard: dashboardReducer,
    employee: employeeReducer,
    assetType: assetTypeReducer,
    assetAudit: assetAuditReducer,
    location: locationReducer,
    assetOperation: assetOperationReducer,
    editAsset: editAssetReducer
  },
});
