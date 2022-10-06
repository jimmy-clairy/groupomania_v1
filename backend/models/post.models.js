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
            default: "http://www.ipsgroup.fr/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png"
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