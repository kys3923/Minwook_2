const express = require('express');
const router = express.Router();
const { registerReservation, listAllReservations, updateRerservations, deleteReservation, reservationList } = require('../controllers/reservation');

router.route("/create").post(registerReservation);
router.route("/list/listreservation").get(listAllReservations);
router.route("/list/:id").get(reservationList)
router.route("/:id").put(updateRerservations);
router.route("/:id").delete(deleteReservation);

module.exports = router;