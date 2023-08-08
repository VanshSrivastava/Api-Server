const Sequelize = require("sequelize");// for defining datatypes
const db = require("../db_connection/connection");


const Teacher = db.define("teacher", {
    teacher_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Teacher;
