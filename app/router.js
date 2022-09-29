const express = require('express');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const listController = require('./controllers/listController');
const timerController = require('./controllers/timerController');
const authController = require('./controllers/authController');
const auth = require('./middlewares/auth');

const router = express.Router();

router.get('/', homeController.homePage);



// CRUD User
router.post('/api/users', userController.create);
router.get('/api/users', auth, userController.read);
router.patch('/api/users', auth, userController.update);
router.delete('/api/users', auth, userController.delete);

// CRUD LIST
router.post('/api/lists', auth, listController.create);
router.get('/api/lists', auth, listController.readAll);
router.patch('/api/lists/:listId', auth, listController.update);
router.delete('/api/lists/:listId', auth, listController.delete);

// CRUD Timer
router.post('/api/lists/:listId/timers', auth, timerController.create);
router.patch('/api/lists/:listId/timers/:timerId', auth, timerController.update);
router.delete('/api/lists/:listId/timers/:timerId', auth, timerController.delete);

// Auth
router.post('/api/login', authController.login);
router.get('/api/check', auth, authController.check);

module.exports = router;
