const { Router } = require("express");
const diaryController = require("../controllers/diaries");
const authenticator = require("../middleware/authenticator");

const diaryRouter = Router();
diaryRouter.use(authenticator)

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;
