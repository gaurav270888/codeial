const express = require('express');
const router = express.Router();
const usersController = require('../controllers/advertisments_controller')

router.get('/furniture', usersController.furniture);

router.get('/gym', usersController.gym);

module.exports = router;