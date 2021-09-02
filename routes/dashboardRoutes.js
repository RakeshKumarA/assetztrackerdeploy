const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, controller.dashboardLanding);
router.route("/abs").post(protect, controller.assetByStatus);
router.route("/abc").post(protect, controller.assetByCategory);
router.route("/abp").post(protect, controller.assetByPeriod);

module.exports = router;
