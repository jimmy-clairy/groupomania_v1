const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        post: {
            type: String,
            maxlength: 250,
            required: true
        },
        imageUrl: {
            type: String,
        },
        likers: {
            type: [String]
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);