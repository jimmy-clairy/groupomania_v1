const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post.controllers');

// http://localhost:7000/api/post/
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/', auth, postCtrl.deleteAllPosts);
router.delete('/:id', auth, postCtrl.deleteOnePost);
router.put('/:id', auth, multer, postCtrl.modifyOnePost);

module.exports = router;