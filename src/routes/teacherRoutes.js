const express = require('express');
const router = express.Router();

const { getTeacherById, getTeachers,createTeacher } = require('../controllers/teacher');

router.get('/:id', getTeacherById); // GET request for /teacher/{id} - Get a teacher by id
router.get('/', getTeachers); // GET a list of teachers
router.post('/', createTeacher); // POST request for /teacher creating teacher in the database

module.exports = router;
