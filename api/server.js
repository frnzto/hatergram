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

// const ws = createServer((req, res) => {
//     res.writeHead(400)
//     res.end()
// })

// ws.listen(4000, () => console.log('websocket listening on port ', 4001))

// const subscriptionServer = SubscriptionServer.create({
//     schema: schema,
//     execute,
//     subscribe,
//     onConnect: () => console.log('client connected')

// }, { server: ws, path: '/graphql' })

app.use('/graphql',cors({ origin: "http://localhost:3000", credentials: true }), graphqlHTTP({
    schema,
    graphiql: true,
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
const server = createServer(app)
// server.listen(4000 , ()=> {
//     console.log("server started")
//     new SubscriptionServer({
//         schema,
//         execute,
//         subscribe,
//         onConnect: ()=> console.log("client Connected")
//     },{
//         server,
//         path: '/subscriptions'
//     })
// })

app.listen(4000, () => console.log('http server listening on ', 4000))
// const PORT = 4000;
// // const app = express();

// app.use('/graphql', bodyParser.json());

// const apolloServer = new ApolloServer({ 
//     schema: schema, 
//     context: ({req})=> req ,
//     playground: {
//         settings: {
//           'request.credentials': 'include',
//         },
//       }
// });
// apolloServer.applyMiddleware({ app, path: '/graphql' });

// const server = createServer(app);
// apolloServer.installSubscriptionHandlers(server)
// server.listen(PORT, () => {
//     console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
//     console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
//   })