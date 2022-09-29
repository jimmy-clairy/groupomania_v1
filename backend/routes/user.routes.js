const router = require('express').Router();
const userCtrl = require('../controllers/user.controllers');

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);

router.delete('/:id', userCtrl.deleteOneUser);
router.put('/:id', userCtrl.modifyOneUser);


module.exports = router;