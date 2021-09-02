const db = require("../db");
var format = require("pg-format");

// @desc		Add Asset
// @route 	POST /api/assets/
// @access 	Public
const addAsset = async (req, res) => {
  const { onboard, software, hardware, depreciation } = req.body;
  const { userid } = req.user;
  try {
    const results = await db.query(
      "INSERT INTO asset (assetid, assetstatus, userid, empid, onboard, software, hardware, depreciation) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [
        onboard.assetId.value,
        onboard.assetStatus.value,
        userid,
        null,
        onboard,
        JSON.stringify(software),
        JSON.stringify(hardware),
        depreciation,
      ]
    );
    res.status(201).json({
      status: 201,
      userid: results.rows[0].userid,
      onboard: results.rows[0].onboard,
      software: results.rows[0].software,
      hardware: results.rows[0].hardware,
      depreciation: results.rows[0].depreciation,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Edit Asset
// @route 	POST /api/assets/editAsset
// @access 	Public
const editAsset = async (req, res) => {
  const { assetid, onboard, software, hardware, depreciation } = req.body;
  const { userid } = req.user;
  try {
    const results = await db.query(
      "UPDATE asset set assetid = $1, userid=$2, onboard=$3, software = $4, hardware = $5, depreciation=$6 where id=$7 returning *",
      [
        onboard.assetId.value,
        userid,
        onboard,
        JSON.stringify(software),
        JSON.stringify(hardware),
        depreciation,
        assetid
      ]
    );
    res.status(200).json({
      status: 200,
      userid: results.rows[0].userid,
      onboard: results.rows[0].onboard,
      software: results.rows[0].software,
      hardware: results.rows[0].hardware,
      depreciation: results.rows[0].depreciation,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Add Bulk Asset
// @route 	POST /api/bulkassets/
// @access 	Public
const addBulkAsset = async (req, res) => {
  const { assets } = req.body;

  try {
    const results = await db.query(
      format(
        "INSERT INTO asset (assetid, assetstatus, onboard, software, hardware, depreciation, empid, userid) VALUES %L returning *",
        assets
      ),
      [],
      (err) => {
        res.json({ status: 500, message: err.message });
      }
    );

    res.status(201).json({
      status: 201,
      assets: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		View Asset
// @route 	GET /api/assets/viewassets
// @access 	Public
const viewAssets = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT a2.*, u2.name, e2.empname  FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid) LEFT OUTER JOIN employee e2 ON (a2.empid=e2.id)"
    );
    res.status(200).json({
      status: 200,
      assets: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Search Asset
// @route 	POST /api/assets/searchAsset
// @access 	Public
const searchAsset = async (req, res) => {
  const { assetId } = req.body;

  try {
    const searchedAsset = await db.query(
      "SELECT a2.*,u2.name FROM asset a2, users u2 where (a2.userid=u2.userid) and a2.onboard -> 'assetId' ->> 'value' =$1",
      [assetId]
    );

    res.json({
      status: 200,
      noOfAssets: searchedAsset.rowCount,
      asset: searchedAsset.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc		Get Asset
// @route 	Get /api/assets/getAsset
// @access 	Public
const getAssetById = async (req, res) => {

  const id = req.params.id;
  
  try {
    const getAsset = await db.query(
      "SELECT * from asset where id =$1",
      [id]
    );
    res.json({
      status: 200,
      assetbyid: getAsset.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc		Download Assets
// @route 	POST /api/assets/downlAsset
// @access 	Public

const downlAsset = async (req, res) => {
  const { id } = req.body;

  try {
    const downloadedAsset = await db.query(
      "SELECT a2.*,u2.name FROM asset a2, users u2 where (a2.userid=u2.userid) and a2.id = ANY($1::int[])",
      [id]
    );
    const finalDownloadedAsset = downloadedAsset.rows.map((asset) => ({
      assetId: asset.onboard.assetId.value,
      assetStatus: asset.onboard.assetStatus.value,
      assetType: asset.onboard.assetType.value,
      cost: asset.onboard.cost.value,
      invoiceNumber: asset.onboard.invoiceNumber.value,
      invoiceDate: asset.onboard.invoiceDate.value,
      model: asset.onboard.model.value,
      purchaseOrderDate: asset.onboard.purchaseOrderDate.value,
      purchaseOrder: asset.onboard.purchaseOrder.value,
      vendor: asset.onboard.vendor.value,
      location: asset.onboard.location.value,
      purchaseDate: asset.onboard.purchaseDate.value,
      name: asset.name,
    }));

    res.json({
      status: 200,
      assets: finalDownloadedAsset,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};


// @desc		Download Asset Audit
// @route 	POST /api/assets/downlAssetAudit
// @access 	Public

const downlAssetAudit = async (req, res) => {
  const { id } = req.body;

  try {
    const downloadedAssetAudit = await db.query(
      "select a.*, e.empname, u.name from assettransaction a left join employee e on a.empid = e.id left join users u on a.userid = u.userid where a.assetid = ANY($1::int[]) order by a.assetid, a.transactionid",
      [id]
    );
    

    res.json({
      status: 200,
      assetsaudit: downloadedAssetAudit.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc		Assign Employee to asset
// @route 	POST /api/employee/assignEmp
// @access 	Private

const assignAsset = async (req, res) => {
  const { id, assetid } = req.body.assignAsset;
  const { userid } = req.user;
  try {
    const assignEmployee = await db.query(
      "UPDATE asset SET onboard = jsonb_set(body, '{assetStatus.value}', to_json($1::text)::jsonb) and userid=$2 where id=$3",
      ["Assigned", userid, assetid]
    );

    res.json({
      status: 201,
      assettoemployeeassigned: assignEmployee.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc		View Asset Type
// @route 	GET /api/assets/assettype
// @access 	Public
const getAssetType = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT assettypeid, assettypelev1, assettypelev2 FROM assettype"
    );
    res.status(200).json({
      status: 200,
      assettype: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		View Asset Location
// @route 	GET /api/assets/assetlocation
// @access 	Private
const getAssetLocation = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM location"
    );
    res.status(200).json({
      status: 200,
      location: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Asset Audit
// @route 	GET /api/assets/assetaudit/
// @access 	Public
const getAssetAudit = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.query(
      "select a2.*, e2.empname, u2.name from assettransaction a2 LEFT JOIN employee e2 ON a2.empid = e2.id LEFT JOIN users u2 ON a2.userid = u2.userid WHERE a2.assetid = $1 order by a2.transactionid ",
      [id]
    );
    res.status(200).json({
      status: 200,
      assettransaction: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

module.exports = {
  addAsset: addAsset,
  editAsset: editAsset,
  addBulkAsset: addBulkAsset,
  viewAssets: viewAssets,
  searchAsset: searchAsset,
  downlAsset: downlAsset,
  downlAssetAudit: downlAssetAudit,
  getAssetType: getAssetType,
  getAssetLocation: getAssetLocation,
  getAssetAudit: getAssetAudit,
  getAssetById: getAssetById
};
