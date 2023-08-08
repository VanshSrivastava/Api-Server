const express = require("express");
const course = require("../models/course");
const Teacher = require("../models/teacher");

//GET - /course?<field=value> - Get a list of courses based on filters.

exports.getCourses = (req, res) => {
  const name = req.query.name;
  const is_active = req.query.is_active;
  course
    .findAll({
      where: {
        name: name,
        is_active: is_active,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    .then(async(result) => {
      if (!result) {
        return res.status(400).json({
          error: "No course found",
        });
      }
      const marray = await Promise.all(result.map(async (element) => {
        const teacher = await Teacher.findByPk(element.course_mentor, {
          attributes: ["teacher_id", "name", "is_active", "designation"],
        });
        // Adding the teacher details under the 'mentor' field in the course object
        if (teacher) {
          element.dataValues.course_mentor = teacher.dataValues;
        }
        return element;
      }));
      res.status(200).json(marray);
    })
    .catch((err) => {
      console.log("Error fetching the course by id", err);
    });
};

// POST - /course - create a course in the database
exports.createCourse = (req, res) => {
  const {
    course_id,
    course_mentor,
    name,
    start_date,
    end_date,
    description,
    is_active,
  } = req.body;
  course
    .create({
      course_id: course_id,
      course_mentor: course_mentor,
      name: name,
      start_date: start_date,
      end_date: end_date,
      description: description,
      is_active: is_active,
    })
    .then((result) => {
      console.log("Created course");
      Teacher.findByPk(result.course_mentor, {
        attributes: ["teacher_id", "name", "is_active", "designation"],
      })
        .then((teacher) => {
          // Adding the teacher details under the 'mentor' field in the course object
          if (teacher) {
            result.dataValues.course_mentor = teacher;
          }
          res.status(200).json({
            message: "course created successfully!!!",
            course:result});
        })
        .catch((error) => {
          console.error("Error fetching associated teacher:", error);
          res.status(500).json({ error: "Something went wrong!" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//GET - /course/{id} - Get a course by id.


exports.getCourseById = (req, res) => {
  console.log(req);
  course
    .findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          error: "No course found",
        });
      }
      Teacher.findByPk(result.course_mentor, {
        attributes: ["teacher_id", "name", "is_active", "designation"],
      })
        .then((teacher) => {
          // Adding the teacher details under the 'mentor' field in the course object
          if (teacher) {
            result.dataValues.course_mentor = teacher;
          }
          res.status(200).json(result);
        })
        .catch((error) => {
          console.error("Error fetching associated teacher:", error);
          res.status(500).json({ error: "Something went wrong!" });
        });
    })

    .catch((err) => {
      console.log("Error fetching the course by id", err);
    });
};
