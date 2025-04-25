const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM genre ORDER BY name");
  return rows;
}

async function createGenre(name) {
  await pool.query("INSERT INTO genre (name) VALUES ($1)", [name]);
}

module.exports = { getAll, createGenre };
