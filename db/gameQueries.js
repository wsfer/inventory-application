const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM game");
  return rows;
}

// TODO: limit results to 5 and order by created_at
async function getRecent() {
  const { rows } = await pool.query(`
    SELECT game.*, json_object_agg(genre.id, genre.name) AS genre FROM game
    JOIN game_genre ON game.id = game_genre.game_id
    JOIN genre ON genre_id = game_genre.genre_id
    GROUP BY game.id;
  `);
  return rows;
}

module.exports = { getAll, getRecent };
