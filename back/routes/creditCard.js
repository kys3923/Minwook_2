const express = require('express');
const router = express.Router();

const { registerCreditCard, listCard, updateCreditCard, deleteCreditCard } = require('../controllers/creditCard');

router.route('/register').post(registerCreditCard);
router.route('/list/:id').get(listCard);
router.route('/update/:id').put(updateCreditCard);
router.route('/delete/:id').delete(deleteCreditCard);

module.exports = router;