const asyncHandler = require("express-async-handler");
const genreQueries = require("../db/genreQueries");

const getGenreForm = asyncHandler(async (req, res) => {
  const genres = await genreQueries.getAll();
  res.render("genre");
});

const createGenre = asyncHandler(async (req, res) => {
  res.redirect("/create");
});

module.exports = { getGenreForm, createGenre };
