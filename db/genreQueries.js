const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM genre ORDER BY name");
  return rows;
}

async function getById(id) {
  if (Number.isInteger(Number(id))) {
    const { rows } = await pool.query("SELECT * FROM genre WHERE id = ($1)", [
      id,
    ]);
    return rows;
  }
  return [];
}

async function getByName(name) {
  const { rows } = await pool.query(
    "SELECT * FROM genre WHERE LOWER(name) = LOWER($1)",
    [name],
  );
  return rows;
}

async function createGenre(name) {
  await pool.query("INSERT INTO genre (name) VALUES ($1)", [name]);
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM genre WHERE id = ($1)", [id]);

  // This will clear games without genres.
  // TODO: There should be a better way to do it...
  await pool.query(`
    DELETE FROM game
    WHERE id NOT IN (SELECT game_id FROM game_genre);
  `);
}

module.exports = { getAll, getById, getByName, createGenre, deleteGenre };
