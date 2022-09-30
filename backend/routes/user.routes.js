const router = require('express').Router();
const userCtrl = require('../controllers/user.controllers');
const auth = require('../middleware/auth')

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);

router.delete('/:id', auth, userCtrl.deleteOneUser);
router.put('/:id', auth, userCtrl.modifyOneUser);


module.exports = router;