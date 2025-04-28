const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const genreQueries = require("../db/genreQueries");
const validateGenre = require("../middlewares/validateGenre");

const { SECRET_PASSWORD } = process.env;

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
        .render("genre", { genres: genres, genreError: errorMessage });
    }

    await genreQueries.createGenre(genreName);
    res.redirect("/create");
  }),
];

const deleteGenre = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const targetGenre = (await genreQueries.getById(id))[0];

  // This is not the best way to secure it, but this project is just for learning purposes
  if (targetGenre && password === SECRET_PASSWORD) {
    await genreQueries.deleteGenre(id);
    res.redirect("/genre/create");
  } else {
    const genres = await genreQueries.getAll();

    res.status(targetGenre ? 400 : 404).render("genre", {
      genres: genres,
      deleteError: targetGenre ? "Wrong password" : "Genre doesn't exist",
      modalStatus: { open: true, id: id, name: targetGenre?.name },
    });
  }
});

module.exports = { getGenreForm, createGenre, deleteGenre };
