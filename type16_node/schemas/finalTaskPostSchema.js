const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const finalTaskPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    likes: {
            type: Array,
            required: false
        },
    comments:{
        type: Array,
        required: false
    },

});

const user = mongoose.model("type16_user_posts", finalTaskPostSchema);
module.exports = user;