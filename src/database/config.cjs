require('dotenv').config(); 

module.exports = {
  development: {
    url: process.env.CONNECTION_STRING,
    dialect: 'postgres', 
  },
  production: {
    url: process.env.CONNECTION_STRING,
    dialect: 'mysql',
  }
};