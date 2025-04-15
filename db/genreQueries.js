const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM genre ORDER BY name");
  return rows;
}

module.exports = { getAll };
