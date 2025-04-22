const { body } = require("express-validator");

const validateGame = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title is too long, should be maximum 50 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 700 })
    .withMessage("Description is too long, should be maximum 700 characters"),
  body("developer")
    .trim()
    .notEmpty()
    .withMessage("Developer is required")
    .isLength({ max: 50 })
    .withMessage("Developer name is too long, should be maximum 50 characters"),
  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image is required")
    .bail()
    .isLength({ max: 300 })
    .withMessage("Image url is too long, should be maximum 300 characters")
    .isURL({ protocols: ["http", "https"] })
    .withMessage("Image link is invalid"),
  body("steam")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ max: 100 })
    .withMessage("Steam link is too long, should be maximum 100 characters")
    .isURL({
      protocols: ["http", "https"],
      host_whitelist: ["store.steampowered.com"],
    })
    .withMessage(
      "Steam link is invalid, should be from 'store.steampowered.com'",
    ),
  body("gog")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ max: 100 })
    .withMessage("Gog link is too long, should be maximum 100 characters")
    .isURL({
      protocols: ["http", "https"],
      host_whitelist: ["www.gog.com"],
    })
    .withMessage("Gog link is invalid, should be from 'www.gog.com'"),
  body("external")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ max: 100 })
    .withMessage("External link is too long, should be maximum 100 characters")
    .isURL({ protocols: ["http", "https"] })
    .withMessage("External link is invalid"),
  body("genre")
    .notEmpty()
    .withMessage("At least one genre is required")
    .bail()
    .isInt()
    .withMessage("WTF are you doing? stop modifying the page"),
];

module.exports = validateGame;
