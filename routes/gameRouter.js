const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", gameController.getGamelist);
gameRouter.get("/:id", gameController.getGame);
gameRouter.post("/create", gameController.createGame);

module.exports = gameRouter;
