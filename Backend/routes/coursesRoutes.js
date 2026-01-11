const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const coursesController = require('../controllers/coursesController');

router.use(auth); // protect all routes

router.get('/', coursesController.getCourses);
router.get('/:id', coursesController.getCourse);
router.post('/', coursesController.createCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
