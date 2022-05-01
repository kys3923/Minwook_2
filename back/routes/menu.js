const express = require('express');
const router = express.Router();

const { listMenu, listAllMenu, registerMenu, updateMenu, deleteMenu, listMenuById } = require('../controllers/menu');

router.route("/").get(listMenu);

router.route("/").post(registerMenu);

router.route("/allmenu").get(listAllMenu);

router.route("/update/:id").put(updateMenu);

router.route("/list/:id").get(listMenuById);

router.route("/delete/:id").delete(deleteMenu);

module.exports = router;