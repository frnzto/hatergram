const express = require("express")
const { graphqlHTTP,  }= require("express-graphql")
import {ApolloServer} from "apollo-server-express"
const schema =require("./schema")
import bodyParser from "body-parser"
import { sequelize } from "./db"
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import passport from "passport";
import initializePassport  from "./helpers/passportConfig"
import session from "express-session"
import { execute, subscribe} from "graphql"
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

const PORT = 4000;


app.use('/graphql', bodyParser.json());

const apolloServer = new ApolloServer({ 
    cors: false,
    schema: schema, 
    context: ({req})=> {
      return req} ,
    playground: {
        settings: {
          "schema.polling.enable": false,
          'request.credentials': 'include',
        },
      }
});
apolloServer.applyMiddleware({ app, path: '/graphql', cors:{origin: "http://localhost:3000", credentials: true} });

const server = createServer(app);
apolloServer.installSubscriptionHandlers(server)
server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  })