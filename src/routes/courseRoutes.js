const express = require("express");
const router = express.Router();

const {
  getCourseById,
  getCourses,
  createCourse,
} = require("../controllers/course");

router.get("/:id", getCourseById); // GET request for /course/{id} - Get a course by id
router.get("/", getCourses); // GET request for /course?<field=value> - Get a list of courses based on filters.
router.post("/", createCourse); // POST - /course - create a course in the database

module.exports = router;
