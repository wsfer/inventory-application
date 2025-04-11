const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

module.exports = { getAll };
