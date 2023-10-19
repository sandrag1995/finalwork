const jwt = require("jsonwebtoken")

module.exports = {

    validateUser: (req, res, next) => {
        const {
            username,
            password,
            pass2
        } = req.body


        if (!username || !password) return res.send({ error: true, data: null, message: "You can't leave empty fields" });
        // if (password !== pass2) {
        //     return res.send({ error: true, data: null, message: "passwords should match" });
        // }
        if (!username || username.length < 4 || username.length > 20) return res.send({ error: true, data: null, message: "Bad username" });
        if (!password || password.length < 4 || password.length > 20) return res.send({ error: true, data: null, message: "Bad password length" });


        if (password.search(/[0-9]/) < 0) return res.send({error: true, data: null, message: "password should contain at least one digit!"})
        if (password.search(/[A-Z]/) < 0) return res.send({error: true, data: null, message: "password should contain at least one uppercase letter!"})

        next()
    },
    authorize: (req, res, next) => {
        const token = req.headers.authorization

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, item) => {
            if(err) {
                return res.send({error: true, message: "bad auth"})
            }
            req.user = item
            return next()
        })
    },


}