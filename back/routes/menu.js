const express = require('express');
const router = express.Router();

const { listMenu, listAllMenu, registerMenu, updateMenu, deleteMenu } = require('../controllers/menu');

router.route("/").get(listMenu);

router.route("/").post(registerMenu);

router.route("/allmenu").get(listAllMenu);

// router.route("/:id").put(updateMenu);

// router.route("/:id").delete(deleteMenu);

module.exports = router;