const asyncHandler = require("express-async-handler");
const gameQueries = require("../db/gameQueries");
const genreQueries = require("../db/genreQueries");

const getGamelist = asyncHandler(async (req, res) => {
  const games = await gameQueries.getAll();
  const genres = await genreQueries.getAll();

  res.render("gamelist", { games: games, genres: genres });
});

const getGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const game = await gameQueries.getById(id);

  res.render("game", { game: game });
});

module.exports = { getGamelist, getGame };
