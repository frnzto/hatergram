const express = require("express")
const { graphqlHTTP }= require("express-graphql")
const schema =require("./schema")
import { sequelize } from "./db"
import passport from "passport";
import initializePassport  from "./helpers/passportConfig"
import session from "express-session"
const cors = require("cors")
require('dotenv').config()

const app = express();


initializePassport(passport)


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/graphql',cors({ origin: "http://localhost:3000", credentials: true }), graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(cors())

app.get("/", async (req,res) => {
    // await sequelize.models.message.sync({force: true})
    // await sequelize.models.chatroom.sync({force: true})
    // await sequelize.models.follower.sync()
    // await sequelize.models.hates.sync({alter: true})
    // await sequelize.models.comment.sync({alter: true})
    // await sequelize.models.user.sync({alter: true})
    // await sequelize.models.post.sync({alter: true})
    res.send("hi")
})

app.listen(4000 , ()=> console.log("server started"))