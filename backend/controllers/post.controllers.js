const PostModel = require('../models/post.models');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');

exports.createPost = (req, res) => {

    const post = new PostModel({
        posterId: req.auth.userId,
        post: req.body.post,
        likers: [],
    });

    if (req.file) { post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }

    post.save()
        .then(() => { res.status(201).json({ message: 'Saved post !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.getOnePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    PostModel.findById(req.params.id)
        .then((post) => { res.status(201).json(post) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.getAllPosts = (req, res) => {
    PostModel.find()
        .then((posts) => { res.status(201).json(posts) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.deleteOnePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    PostModel.findById(req.params.id)
        .then((post) => {
            if (post.posterId === req.auth.userId) {
                // Supprime l'image
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    PostModel.findByIdAndDelete(req.params.id)
                        .then(() => { res.status(200).json({ message: 'Delete post !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            } else {
                return res.status(201).json({ message: 'No authorize !' })
            }
        })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyOnePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    PostModel.findById(req.params.id)
        .then((post) => {
            if (post.posterId === req.auth.userId) {

                const postModify = {
                    post: req.body.post,
                };

                if (req.file) {
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) throw err;
                        console.log(`images/${filename} was deleted`);
                    });
                    postModify.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                };

                PostModel.findByIdAndUpdate(req.params.id, postModify)
                    .then(() => { res.status(201).json({ message: 'Modify one post !' }) })
                    .catch(error => { res.status(400).json({ error }) })
            } else {
                return res.status(201).json({ message: 'No authorize !' })
            }
        })
        .catch(error => { res.status(400).json({ error }) })
};

// Deleted
exports.deleteAllPosts = (req, res) => {
    PostModel.deleteMany()
        .then(() => { res.status(201).json({ message: 'Delete all posts !' }) })
        .catch(error => { res.status(400).json({ error }) })
};