const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post.controllers');

// http://localhost:7000/api/post/
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/', auth, postCtrl.deleteAllPosts);


module.exports = router;