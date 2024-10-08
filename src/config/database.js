const { Sequelize } = require('sequelize');
const config = require('./config');


const env = process.env.NODE_ENV || 'local';


const database = new Sequelize(config[env].database, config[env].username, config[env].password, {
  host: config[env].host,
  dialect: config[env].dialect,
  port: config[env].port,
  logging: console.log
});


const testConnection = async () => {
  try {
    await database.authenticate();
    console.log('Connection to sqlite has been established successfully...');
  } catch (error) {
    console.error('Unable to connect to the database due to: {`error`}');
  }
}


testConnection();


module.exports = database;
