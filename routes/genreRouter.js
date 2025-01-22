const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", genreController.getAll);

module.exports = genreRouter;
