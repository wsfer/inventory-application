const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const gameQueries = require("../db/gameQueries");
const genreQueries = require("../db/genreQueries");
const NotFoundError = require("../errors/NotFoundError");
const validateGame = require("../middlewares/validateGame");

const { SECRET_PASSWORD } = process.env;

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

// TODO: check if an image links works by making a http request to HEAD
const createGame = [
  validateGame,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Convert error array into an object with key (field name) and value (messages array)
      const errorObject = errors.array().reduce((newErrors, currentError) => {
        if (newErrors[currentError.path]) {
          newErrors[currentError.path].push(currentError.msg);
        } else {
          newErrors[currentError.path] = [currentError.msg];
        }
        return newErrors;
      }, {});

      const genres = await genreQueries.getAll();
      return res
        .status(400)
        .render("form", { genres: genres, errors: errorObject });
    }

    // This removes duplicate genres
    req.body.genre = [
      ...new Set(
        Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre],
      ),
    ];

    await gameQueries.createGame(req.body);
    res.redirect("/");
  }),
];

const deleteGame = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  // This is not the best way to secure it, but this project is just for learning purposes
  if (Number.isInteger(Number(id)) && password === SECRET_PASSWORD) {
    await gameQueries.deleteGame(id);
    res.redirect("/");
  } else if (Number.isInteger(Number(id))) {
    const game = await gameQueries.getById(id);

    if (game) {
      res.render("game", {
        game: game,
        formOpen: true,
        error: "Wrong password",
      });
    } else {
      throw new NotFoundError("Game not found");
    }
  }
});

module.exports = { getGamelist, getGame, createGame, deleteGame };
