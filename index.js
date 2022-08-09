import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from 'express';
import http from 'http';
import dotenv from "dotenv";
import typeDefs from "./typeDefs.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const httpServer = http.createServer(app);
const port = process.env.PORT || 4000

mongoose.connect(process.env.DB_URL,
  {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>{
  console.log("DB connected")
})
.catch((err)=>{
  console.log(err)
})

// first it get typeDefs the use mongoose schema and last go to resolvers.....

import "./Models/userModel.js"
import "./Models/foodModel.js"
import "./Models/orderModel.js"
import resolvers from "./resolvers.js"
import rootRoutes from "./Routes/rootRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

const context = ({req}) =>{

  const Auth = req.headers.authorization

  if(Auth){
    const token = Auth.slice(7, Auth.length)
    const isAuth = jwt.verify(token, process.env.JWT_TOKEN)
    return {isAuth};
  }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins : [
        ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  });

await server.start();
server.applyMiddleware({ 
    app,
    path : "/graphql"
});

app.get("/",(req, res)=>{
    res.send("Its work")
})

app.use("/api/root", rootRoutes)
app.use("/api/order", orderRoutes)


app.use((err, req, res, next)=>{
  res.status(500).send({ message : err.message })
})


httpServer.listen({ port }, ()=> {
  console.log(`🚀  Server ready at ${server.graphqlPath} or 4000`);
})
