const express = require('express');
const router = express.Router();
const { registerReservation, listAllReservations, updateRerservations, deleteReservation } = require('../controllers/reservation');
const { protect } = require('../middleware/auth');

router.route("/create").post(protect, registerReservation);
router.route("/listreservation").get(protect, listAllReservations);
router.route("/:id").put(protect, updateRerservations);
router.route("/:id").delete(protect, deleteReservation);

module.exports = router;