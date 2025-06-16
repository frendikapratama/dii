const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.post("/loop", scheduleController.createSchedulesLoop);
router.get("/", scheduleController.getAllSchedules);

module.exports = router;
