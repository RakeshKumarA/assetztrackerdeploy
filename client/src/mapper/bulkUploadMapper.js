export const bulkuploadMApper = (assets) => {
  let bulkUpload = [];
  bulkUpload = assets.map((asset) => ({
    assetId: asset.assetId,
    assetStatus: "Onboarding",
    onboard: {
      assetId: {
        lable: "Asset Id",
        value: asset.assetId,
      },
      assetStatus: {
        lable: "Asset Status",
        value: "Onboarding",
      },
      assetType: {
        lable: "Asset Type",
        value: asset.assetType,
      },
      cost: {
        lable: "Cost",
        value: asset.cost,
      },
      invoiceNumber: {
        lable: "Invoice Number",
        value: asset.invoiceNumber,
      },
      putToUseDate: {
        lable: "Put to use Date",
        value: asset.putToUseDate,
      },
      invoiceDate: {
        lable: "Invoice Date",
        value: asset.invoiceDate,
      },
      model: {
        lable: "Model",
        value: asset.model,
      },
      purchaseOrderDate: {
        lable: "Purchase Order Date",
        value: asset.purchaseOrderDate,
      },
      purchaseOrder: {
        lable: "Purchase Order",
        value: asset.purchaseOrder,
      },
      vendor: {
        lable: "Vendor",
        value: asset.vendor,
      },
      location: {
        lable: "Location",
        value: asset.location,
      },
      purchaseDate: {
        lable: "Purchase Date",
        value: asset.purchaseDate,
      },
    },
    software: "[]",
    hardware: "[]",
    depreciation: {
      shelflife: {
        lable: "Shelf Life",
        value: asset.shelflife,
      },
      residualvalue: {
        lable: "Residual Value",
        value: asset.residualvalue,
      },
      depmethod: {
        lable: "Depreciation Method",
        value: asset.depmethod,
      },
    },
    empid: null,
  }));
  return bulkUpload;
};
