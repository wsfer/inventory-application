const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", gameController.getAll);

module.exports = gameRouter;
