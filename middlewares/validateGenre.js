const { body } = require("express-validator");

const validateGenre = [
  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required")
    .isLength({ max: 20 })
    .withMessage("Genre is too long, should be maximum 20 characters"),
];

module.exports = validateGenre;
