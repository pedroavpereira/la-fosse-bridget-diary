const { Router } = require("express");
const userController = require("../controllers/users");

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);

module.exports = userRouter;
