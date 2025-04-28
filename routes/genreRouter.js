const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/create", genreController.getGenreForm);
genreRouter.post("/create", genreController.createGenre);
genreRouter.post("/delete/:id", genreController.deleteGenre);

module.exports = genreRouter;
