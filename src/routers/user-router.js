const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user-controller");

router.get("/users/me", auth, userController.readProfile);
router.patch("/users/me", auth, userController.updateUser);
router.delete("/users/me", auth, userController.removeUser);
router.post("/users/logout", auth, userController.logOut);
router.post("/users/logoutAll", auth, userController.logOutAll);
router.post("/users", userController.createUser);
router.post("/users/login", userController.logIn);

module.exports = router;
