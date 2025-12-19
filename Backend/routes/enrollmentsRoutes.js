const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const enrollmentsController = require('../controllers/enrollmentsController');

router.use(auth);

router.get('/', enrollmentsController.getEnrollments);
router.get('/:id', enrollmentsController.getEnrollment);
router.post('/', enrollmentsController.createEnrollment);
router.put('/:id', enrollmentsController.updateEnrollment);
router.delete('/:id', enrollmentsController.deleteEnrollment);

module.exports = router;
