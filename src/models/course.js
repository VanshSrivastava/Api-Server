const Sequelize = require("sequelize");// for defining datatypes
const db = require("../db_connection/connection"); // for connecting to database
const Teacher = require("./teacher"); 

const Course = db.define("course", {
    course_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    course_mentor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {       // course belongsTo teacher 1:1
            model: Teacher,
            key: 'teacher_id',
    },
},
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});
Course.belongsTo(Teacher, { // course belongsTo teacher 1:1
    foreignKey: 'course_mentor', 
    as: 'mentor', //alias
  });

module.exports = Course;