const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
//const userController = require('./users')

console.log('router loaded');

router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));

router.use('/advertisment', require('./advertisments'));

module.exports = router;