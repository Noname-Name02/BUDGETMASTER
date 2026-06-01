const { Pool } = require('pg');

const poolIntegration = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '7931',
  database: 'budgetdb_test', 
  port: 5432,
});

module.exports = poolIntegration;