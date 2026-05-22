const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    resetPassword,
    getUsers
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.get("/users", getUsers);

module.exports = router;