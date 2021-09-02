const express = require("express");
const router = express.Router();
const controller = require("../controllers/assetController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, controller.addAsset);
router.route("/bulkassets").post(protect, controller.addBulkAsset);
router.route("/viewassets").get(protect, controller.viewAssets);
router.route("/searchAsset").post(protect, controller.searchAsset);
router.route("/downlAsset").post(protect, controller.downlAsset);
router.route("/downlAssetAudit").post(protect, controller.downlAssetAudit);
router.route("/assettype").get(protect, controller.getAssetType);
router.route("/assetlocation").get(protect, controller.getAssetLocation);
router.route("/assetaudit/:id").get(protect, controller.getAssetAudit);
router.route("/asset/:id").get(protect, controller.getAssetById);
router.route("/editAsset").post(protect, controller.editAsset);

module.exports = router;
