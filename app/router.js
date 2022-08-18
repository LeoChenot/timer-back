const express = require('express');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const listController = require('./controllers/listController');
const timerController = require('./controllers/timerController');
const authController = require('./controllers/authController');

const router = express.Router();

router.get('/', homeController.homePage);



// CRUD User
router.post('/api/user', userController.create);
router.get('/api/user', userController.read);
router.patch('/api/user', userController.update);
router.delete('/api/user', userController.delete);

// CRUD LIST
router.post('/api/list', listController.create);
router.get('/api/list', listController.read);
router.patch('/api/list/:id', listController.update);
router.delete('/api/list/:id', listController.delete);

// CRUD Timer
router.post('/api/timer', timerController.create);
router.get('/api/timer', timerController.read);
router.patch('/api/timer/:id', timerController.update);
router.delete('/api/timer/:id', timerController.delete);

// Auth
router.post('/api/login', authController.login);
router.post('/api/check', authController.check);

module.exports = router;
