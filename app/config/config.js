require('dotenv').config();

module.exports = {   
  "development": {
    username: 'digitalhouse',
    password: 'digitalhouse',
    database: 'musicando',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,    
    pool: 
    {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};