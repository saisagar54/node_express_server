const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {type: String, required: true },
    subject: {type: String, required: true },
    content: {type: String, required: true}
});

module.exports = mongoose.model('Post', noteSchema);