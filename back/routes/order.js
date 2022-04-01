const express = require('express');
const router = express.Router();
const { orderRegistration, orderList, orderAllList, updateOrder, deleteOrder } = require('../controllers/order');

router.route("/create").post(orderRegistration);
router.route("/:id").get(orderList);
router.route("/:id").put(updateOrder);
router.route("/:id").delete(deleteOrder);
router.route("/list/listorder").get(orderAllList);

module.exports = router;