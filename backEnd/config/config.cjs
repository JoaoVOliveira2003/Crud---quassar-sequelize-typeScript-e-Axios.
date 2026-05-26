require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'senha',
    database: process.env.DB_NAME || 'testes',
    host:     process.env.DB_HOST || 'localhost',
    port:     process.env.DB_PORT || 5432,
    dialect:  'postgres',
    seederStorage: 'sequelize'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host:     '127.0.0.1',
    dialect:  'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host:     '127.0.0.1',
    dialect:  'mysql'
  }
}