const express= require("express");
const teacher = require("../models/teacher");

// GET request for /teacher/{id} - Get a teacher by id

exports.getTeacherById = (req, res) => {
  const id = req.params.id;
  teacher
    .findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          error: "No teacher found",
        });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//- GET a list of teachers
// /teacher?name=Jason&is_active=true

exports.getTeachers = (req, res) => {
  const name = req.query.name;
  const is_active = req.query.is_active;
  teacher
    .findAll({
      where: {
        name: name,
        is_active: is_active,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          error: "No teacher found",
        });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//POST request for /teacher creating teacher in the database

exports.createTeacher = (req, res) => {
  const { name, is_active, designation } = req.body;
  teacher
    .create({
      name: name,
      is_active: is_active,
      designation: designation,
    })
    .then((result) => {
      res.status(200).json({
        message: "teacher created successfully!",
        teacher: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
