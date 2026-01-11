const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const usersController = require('../controllers/usersController');

// ✅ PUBLIC ROUTES (NO TOKEN)
router.post('/register', usersController.createUser);
router.post('/login', usersController.login);

// ✅ PROTECTED ROUTES (TOKEN REQUIRED)
router.get('/', auth, usersController.getUsers);
router.get('/:id', auth, usersController.getUser);
router.put('/:id', auth, usersController.updateUser);
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router;
