const express = require("express")
const router = express.Router()

const {
    registerUser,
    loginUser,
    updateUserProfilePicture,
    updatePassword,
    makePost,
    getPosts,
    like,
    comment,
    getAllUsers,
    autoLogin, sendMessage, getMessages
} = require("../controllers/finalTaskController")

const {authorize, validateUser} = require("../middleware/finalTaskValidators")


router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/updateImage", authorize, updateUserProfilePicture);
router.post("/updatePassword", authorize, updatePassword)
router.post("/make-post", authorize, makePost);

router.get("/getAllUsers", getAllUsers);

router.get("/getPosts", getPosts);

router.get("/like/:postId/:username", like)

router.post("/comment", authorize, comment)

router.get("/getMessages", getMessages)

router.post("/message", authorize, sendMessage)

router.get("/autologin", authorize, autoLogin);

module.exports = router