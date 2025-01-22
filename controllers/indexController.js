const asyncHandler = require("express-async-handler");
const gameQueries = require("../db/gameQueries");
const genreQueries = require("../db/genreQueries");

const getAll = asyncHandler(async (req, res) => {
  const games = await gameQueries.getAll();
  res.render("home", { games: games });
});

module.exports = { getAll };
