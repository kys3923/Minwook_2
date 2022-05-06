const express = require('express');
const router = express.Router();

const { chargeCard } = require('../controllers/creditCard');

router.route('/charge').post(chargeCard)

module.exports = router;