const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { registerController, loginController, getUser, logoutController } = require("../controllers/auth.controller");
const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user", getUser);

router.get("/logout", logoutController);



module.exports = router;