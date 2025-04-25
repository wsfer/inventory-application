const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const genreQueries = require("../db/genreQueries");
const validateGenre = require("../middlewares/validateGenre");

const getGenreForm = asyncHandler(async (req, res) => {
  const genres = await genreQueries.getAll();
  res.render("genre");
});

// TODO: check if genre name already exists
const createGenre = [
  validateGenre,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      return res.status(400).render("genre", { error: errorMessage });
    }

    res.redirect("/create");
  }),
];

module.exports = { getGenreForm, createGenre };
