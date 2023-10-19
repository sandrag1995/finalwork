const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const finalTaskUserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
        default: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    },

});


const user = mongoose.model("type16_final_task_users", finalTaskUserSchema);
module.exports = user;