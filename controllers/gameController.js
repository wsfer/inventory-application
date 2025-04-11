const asyncHandler = require("express-async-handler");
const gameQueries = require("../db/gameQueries");
const genreQueries = require("../db/genreQueries");

const getGamelist = asyncHandler(async (req, res) => {
  const games = await gameQueries.getAll();
  const genres = await genreQueries.getAll();

  res.render("gamelist", { games: games, genres: genres });
});

module.exports = { getGamelist };
