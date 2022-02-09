const express = require('express');
const router = express.Router();
const { orderRegistration, orderList, orderAllList, updateOrder, deleteOrder } = require('../controllers/order');
const { protect } = require('../middleware/auth');

router.route("/create").post(protect, orderRegistration);
router.route("/:id").get(protect, orderList);
router.route("/:id").put(protect, updateOrder);
router.route("/:id").delete(protect, deleteOrder);
router.route("/alllist").get(protect, orderAllList);

module.exports = router;