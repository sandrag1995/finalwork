const userDb = require("../schemas/finalTaskUserSchema")
const postDb = require("../schemas/finalTaskPostSchema");
const messageDb = require("../schemas/finalTaskMessageSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const resSend = (res, error, data, message) => {
    res.send({error, data, message})
}

module.exports = {

    registerUser: async (req, res) => {
        const {username, password} = req.body

        const userExists = await userDb.findOne({username})
        if(userExists) return resSend(res, true, null, "User with this name exists")

        const hash = await bcrypt.hash(password, 10)
        const newUser = new userDb({
            username,
            password: hash,
            likes: [],
            comments: [],
            messages: []
        })

        await newUser.save()
        resSend(res, false, null, null)
    },

    loginUser: async (req, res) => {
        const {username, password} = req.body
        const userExists = await userDb.findOne({username})

        if (userExists) {
            const passwordCompare = await bcrypt.compare(password, userExists.password)
            if (passwordCompare) {
                const user = {
                    id: userExists._id,
                    username: userExists.username,
                }

                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

                return resSend(res, false, {id: userExists._id, image: userExists.image, username: userExists.username, token}, null)
            } else {
                return resSend(res, true, null, "bad credentials")
            }
        } else {
            return resSend(res, true, null, "user does not exist")
        }
    },

    autoLogin: async (req, res) =>{
        const user = await userDb.findOne({_id: req.user.id})
        return resSend(res, false, {...user}, null)
    },

    updateUserProfilePicture: async (req, res) => {
        const {image, id} = req.body
        const userExists = await userDb.findOne({_id: id})
        if(!userExists) return resSend(res, true, null, "user does not exist")

        const newUser = await userDb.findOneAndUpdate({_id: id}, {$set: {image}}, {new: true})
        return resSend(res, false, {id: newUser._id, image: newUser.image, username: userExists.username , password: userExists.password}, null)
    },


    updatePassword: async (req, res) => {
        const { password, id } = req.body;

        const userExists = await userDb.findOne({ _id: id });
        if (!userExists) return resSend(res, true, null, "user does not exist");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userDb.findOneAndUpdate({ _id: id }, { $set: { password: hashedPassword } }, { new: true });
        return resSend(res, false, { id: newUser._id, image: userExists.image, username: userExists.username, password: newUser.password }, null);
    },

    makePost: async (req, res) =>{
        const {title, image, id, likes, comments} = req.body

        console.log(req.body)
        const userExists = await userDb.findOne({_id: id}, {username: 1})
        if(!userExists) return resSend(res, true, null, "user does not exist")

        const newPost = new postDb({
            title,
            image,
            username: userExists.username,
            likes,
            comments,
        })

        await newPost.save()

        const posts = await postDb.find({});

        return resSend(res, false, posts, null);

    },


    getAllUsers: async (req, res) => {
        try {
            const users = await userDb.find({}, { _id: 1, username: 1, image: 1 });
            return resSend(res, false, users, null);
        } catch (error) {
            console.error(error);
            return resSend(res, true, null, "Error fetching users");
        }

    },

    getPosts: async (req, res) => {
        const {id} = req.params

        const posts = await postDb.find({})

        return resSend(res, false, posts, null)
    },

    like: async (req, res) => {

        const { postId, username } = req.params;

            const post = await postDb.findOne({ _id: postId });

            if (!post) {
                return res.status(404).send({ error: true, message: 'Post not found' });
            }

            const likedAlready = post.likes.includes(username);

            if (likedAlready) {
                post.likes = post.likes.filter((like) => like !== username);
            } else {
                post.likes.push(username);
            }

            await post.save();

            const posts = await postDb.find({});

            return resSend(res, false, posts, null);
    },

    comment: async (req, res) => {

            const { comment, postId } = req.body;
            const toPost = await postDb.findOne({ _id: postId });

            if (!toPost) {
                return res.status(404).json({ error: true, message: 'Post not found' });
            }

            const newComment = {
                text: req.body.text,
                postedBy: req.body.postedBy,
            };

            toPost.comments.push(newComment);

            await toPost.save();

            const posts = await postDb.find({});

            return resSend(res, false, posts, null);

    },

    sendMessage: async (req, res) =>{

            const { text, to, from, id } = req.body;

        const userExists = await userDb.findOne({_id: id}, {username: 1})
        if(!userExists) return resSend(res, true, null, "user does not exist")

            const newMessage = new messageDb({
                text,
                to,
                from,
            });

                await newMessage.save();

                const messages = await messageDb.find({})

                return resSend(res, false, messages, "Message sent successfully");
    },


    getMessages: async (req, res) =>{
        const {id} = req.params

        const messages = await messageDb.find({})

        return resSend(res, false, messages, null)
    }

}
