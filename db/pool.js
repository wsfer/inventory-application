const { Pool } = require("pg");

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, NODE_ENV } = process.env;

// Development: uses a local database without SSL
// Production: uses a hosting provider database which requires SSL
const sslmode = NODE_ENV === "production" ? { require: true } : false;

module.exports = new Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
  ssl: sslmode,
});
