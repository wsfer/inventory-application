const pool = require("./pool");

async function getAll() {
  const { rows } = pool.query("SELECT * FROM game");
  return rows;
}

module.exports = { getAll };
