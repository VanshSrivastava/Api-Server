const Sequelize= require('sequelize');
const sequelize = new Sequelize(
    process.env.PG_DB, //database name
    process.env.PG_USER, //username
    process.env.PG_PASSWORD, //password
    {
        host: process.env.PG_HOST, //host
        dialect: 'postgres', //database type
    }
);
module.exports = sequelize;