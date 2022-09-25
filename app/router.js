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
router.post('/api/user', userController.create);
router.get('/api/user', auth, userController.read);
router.patch('/api/user', auth, userController.update);
router.delete('/api/user', auth, userController.delete);

// CRUD LIST
router.post('/api/list', auth, listController.create);
router.get('/api/list', auth, listController.read);
router.patch('/api/list/:id', auth, listController.update);
router.delete('/api/list/:id', auth, listController.delete);

// CRUD Timer
router.post('/api/timer', auth, timerController.create);
router.get('/api/timer', auth, timerController.read);
router.patch('/api/timer/:id', auth, timerController.update);
router.delete('/api/timer/:id', auth, timerController.delete);

// Auth
router.post('/api/login', authController.login);
router.get('/api/check', auth, authController.check);

module.exports = router;
