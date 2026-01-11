const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const gradesController = require('../controllers/gradesController');

router.use(auth);

router.get('/', gradesController.getGrades);
router.get('/:id', gradesController.getGrade);
router.post('/', gradesController.createGrade);
router.put('/:id', gradesController.updateGrade);
router.delete('/:id', gradesController.deleteGrade);

module.exports = router;
