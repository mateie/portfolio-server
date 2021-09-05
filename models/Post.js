const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    id: String,
    title: String,
    description: String,
    createdAt: String,
});

module.exports = model('Post', postSchema);