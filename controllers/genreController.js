const asyncHandler = require("express-async-handler");
const genreQueries = require("../db/genreQueries");

const getAll = asyncHandler(async (req, res) => {
  const genres = await genreQueries.getAll();
  res.json(genres);
});

module.exports = { getAll };
