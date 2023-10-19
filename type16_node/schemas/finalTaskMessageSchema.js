const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const finalTaskMessageSchema = new Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const user = mongoose.model("type16_user_messages", finalTaskMessageSchema);
module.exports = user;