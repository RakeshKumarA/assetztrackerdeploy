const { Pool } = require('pg');
require('dotenv').config();

const proConfig = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  const pool = new Pool({
    connectionString: proConfig,
  });
  module.exports = pool;
} else {
  const pool = new Pool();

  module.exports = {
    query: (text, params) => pool.query(text, params),
  };
}
