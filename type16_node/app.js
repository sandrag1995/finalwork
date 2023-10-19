const express = require("express")
const app = express()
const mongoose = require("mongoose")
const router = require("./router/finalTaskRouter")
// const {createServer} = require("node:http")


const cors = require('cors')

require("dotenv").config()


// const server = createServer(app)
// require("./modules/finalTaskSocketModule")(server)

// server.listen(3001, () => {
//     console.log('server running at http://localhost:3001');
// });

mongoose.connect(process.env.DB_KEY)
    .then(() => {
        console.log('CONNECTION SUCCESS')
    }).catch(e => {
    console.log('ERROR', e)
})



app.use(express.json())
// app.use(cors())

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
}));

app.use("/", router)

const port = 8000


app.listen(port)

