var Knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '04177110',
      database : 'user_api'
    }
  });

module.exports = Knex;