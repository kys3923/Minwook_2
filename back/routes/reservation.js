const express = require('express');
const router = express.Router();
const { registerReservation, listAllReservations, updateRerservations, deleteReservation } = require('../controllers/reservation');

router.route("/create").post(registerReservation);
router.route("/listreservation").get(listAllReservations);
router.route("/:id").put(updateRerservations);
router.route("/:id").delete(deleteReservation);

module.exports = router;