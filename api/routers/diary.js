const { Router } = require("express");
const diaryController = require("../controllers/diaries");

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);

module.exports = diaryRouter;
