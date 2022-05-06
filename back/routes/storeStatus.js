const express = require('express');
const router = express.Router();

const { checkStatus, updateStatus } = require('../controllers/storeStatus');

router.route('/checkStatus').get(checkStatus);
router.route('/update/:id').put(updateStatus);

module.exports = router;