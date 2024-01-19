const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authMiddleware} = require('../controllers/userController');


router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);


router.put('/update/:userId', authMiddleware, userController.updateUserProfile);


router.get('/users', userController.getAllUsers);
router.get('/:userId', userController.getUserById);


module.exports = router;
