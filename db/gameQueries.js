const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query(`
    SELECT game.*, json_object_agg(genre.id, genre.name) AS genre FROM game
    JOIN game_genre ON game.id = game_genre.game_id
    JOIN genre ON genre.id = game_genre.genre_id
    GROUP BY game.id;
  `);
  return rows;
}

// TODO: limit results to 5 and order by created_at
async function getRecent() {
  const { rows } = await pool.query(`
    SELECT game.*, json_object_agg(genre.id, genre.name) AS genre FROM game
    JOIN game_genre ON game.id = game_genre.game_id
    JOIN genre ON genre.id = game_genre.genre_id
    GROUP BY game.id;
  `);
  return rows;
}

async function getById(id) {
  const { rows } = await pool.query(
    `
    SELECT game.*, json_object_agg(genre.id, genre.name) AS genre FROM game
    JOIN game_genre ON game.id = game_genre.game_id
    JOIN genre ON genre.id = game_genre.genre_id
    WHERE game.id = ($1)
    GROUP BY game.id;
  `,
    [id],
  );
  return rows[0];
}

async function createGame(game) {
  const { title, description, developer, image, steam, gog, external } = game;
  const genres = Array.isArray(game.genre) ? game.genre : [game.genre];

  await pool.query(
    `
    WITH created_game AS (
      INSERT INTO game (title, description, developer, image_link, steam_link, gog_link, other_link)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    ) INSERT INTO game_genre (game_id, genre_id) 
  `.concat(
      genres.map(
        (genre, i) => `VALUES ((SELECT id FROM created_game), ($${i + 8}))`,
      ),
    ),
    [title, description, developer, image, steam, gog, external, ...genres],
  );
}

module.exports = { getAll, getRecent, getById, createGame };
