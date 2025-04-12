const asyncHandler = require("express-async-handler");
const gameQueries = require("../db/gameQueries");
const genreQueries = require("../db/genreQueries");

const getHomepage = asyncHandler(async (req, res) => {
  const games = await gameQueries.getRecent();
  res.render("homepage", { games: games });
});

const getNotFoundPage = asyncHandler(async (req, res) => {
  const error = { message: "Page not found" };
  res.render("404", { error: error });
});

module.exports = { getHomepage, getNotFoundPage };
