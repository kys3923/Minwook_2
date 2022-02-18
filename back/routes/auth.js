const express = require('express');
const router = express.Router();

const { register, login, forgotpassword, resetpassword, listAllUser, listUser, editUser, deleteUser } = require('../controllers/auth');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/listalluser").get(listAllUser);

router.route("/:id").get(listUser);

router.route("/:id").put(editUser);

router.route("/:id").delete(deleteUser);

module.exports = router;