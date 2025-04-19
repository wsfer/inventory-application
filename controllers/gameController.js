const asyncHandler = require("express-async-handler");
const gameQueries = require("../db/gameQueries");
const genreQueries = require("../db/genreQueries");
const NotFoundError = require("../errors/NotFoundError");

const getGamelist = asyncHandler(async (req, res) => {
  const games = await gameQueries.getAll(req.query);
  const genres = await genreQueries.getAll();

  res.render("gamelist", { games: games, genres: genres });
});

const getGame = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (Number.isInteger(Number(id))) {
    const game = await gameQueries.getById(id);

    if (game) {
      res.render("game", { game: game });
    } else {
      throw new NotFoundError("Game not found");
    }
  } else {
    throw new NotFoundError("Game not found");
  }
});

const createGame = asyncHandler(async (req, res) => {
  // TODO: validate inputs
  const errors = false;

  if (errors) {
    const genres = await genreQueries.getAll();
    return res.status(400).render("form", { genres: genres, errors: errors });
  }

  await gameQueries.createGame(req.body);
  res.redirect("/");
});

module.exports = { getGamelist, getGame, createGame };
