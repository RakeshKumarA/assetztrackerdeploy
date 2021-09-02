import React, { useState } from "react";
import * as XLSX from "xlsx";
import { bulkuploadMApper } from "../mapper/bulkUploadMapper";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
//MUI Libs
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addbulkAsset } from "../reducers/submitBulkAssetSlice";
import CustomTable from "../components/customcomponents/CustomTable";

const useStyles = makeStyles({
  paperStyle: {
    width: "80%",
    minHeight: "95vh",
    margin: "4vh auto",
  },
  title: {
    padding: "1.5rem 0",
  },
  searchContainer: {
    width: "90%",
    paddingBottom: "2rem",
  },
  linkStyling: {
    textDecoration: "none",
  },
});

const BulkUploadScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const { userid } = useSelector((state) => state.user.userInfo);
  const { submitBulkAsset } = useSelector((state) => state.submitBulk);
  const tableRows = submitBulkAsset.map((value) => ({
    id: value.id,
    assetId: value.onboard.assetId.value,
    cost: value.onboard.cost.value,
    vendor: value.onboard.vendor.value,
    purchaseDate: value.onboard.purchaseDate.value,
    assetStatus: value.onboard.assetStatus.value,
    name: value.name,
  }));
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (typeof file !== "undefined") {
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const readExcelFile = (e) => {
    const file = e.target.files[0];
    readExcel(file);
  };

  const uploadFileHandler = () => {
    if (items.length > 0) {
      const bulkUpload = bulkuploadMApper(items);
      const bulkUploadValues = bulkUpload.map(Object.values);
      bulkUploadValues.map((value) => value.push(userid));
      dispatch(addbulkAsset(bulkUploadValues));
    }
    setItems([]);
  };

  return (
    <Paper className={classes.paperStyle}>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h4" color="initial" className={classes.title}>
            Bulk Upload Assets
          </Typography>
        </Grid>
        <Grid item container className={classes.searchContainer} spacing={2}>
          <Grid item xs={3}>
            <TextField
              type="file"
              variant="outlined"
              color="secondary"
              fullWidth={true}
              size={"small"}
              onChange={readExcelFile}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={uploadFileHandler}
            >
              Upload
            </Button>
          </Grid>
          <Grid item>
            <Link
              to="/AssetBulkUpload.xlsx"
              target="_blank"
              download
              className={classes.linkStyling}
            >
              <Button variant="contained" color="default">
                Download Template
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid
          container
          alignItems="center"
          direction="column"
          className={classes.tablePadding}
        >
          <CustomTable rows={tableRows} screen="dashboard" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BulkUploadScreen;
