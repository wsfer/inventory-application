const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.getHomepage);
indexRouter.get("/create", indexController.getGameForm);
indexRouter.get("*", indexController.getNotFoundPage);

module.exports = indexRouter;
