const router = require('express').Router();
const userCtrl = require('../controllers/user.controllers');

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);


module.exports = router;