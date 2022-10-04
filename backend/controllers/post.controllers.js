const PostModel = require('../models/post.models');

exports.createPost = (req, res, next) => {

    const post = new PostModel({
        posterId: req.auth.userId,
        post: req.body.post,
        likers: [],
    });

    if (req.file) { post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }

    post.save()
        .then(() => { res.status(201).json({ message: 'Post enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.deleteAllPosts = (req, res) => {
    PostModel.deleteMany()
        .then(() => { res.status(201).json({ message: 'All Post deleted !' }) })
        .catch(error => { res.status(400).json({ error }) })
}