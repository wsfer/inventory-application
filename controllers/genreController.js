const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const genreQueries = require("../db/genreQueries");
const validateGenre = require("../middlewares/validateGenre");

const getGenreForm = asyncHandler(async (req, res) => {
  const genres = await genreQueries.getAll();
  res.render("genre", { genres: genres });
});

const createGenre = [
  validateGenre,
  asyncHandler(async (req, res) => {
    const genreName = req.body.genre;
    const errors = validationResult(req);
    const existingGenres = await genreQueries.getByName(genreName);

    if (!errors.isEmpty() || existingGenres.length > 0) {
      const genres = await genreQueries.getAll();
      const errorMessage =
        existingGenres.length > 0
          ? "Genre already exists"
          : errors.array()[0].msg;

      return res
        .status(400)
        .render("genre", { genres: genres, error: errorMessage });
    }

    await genreQueries.createGenre(genreName);
    res.redirect("/create");
  }),
];

module.exports = { getGenreForm, createGenre };
