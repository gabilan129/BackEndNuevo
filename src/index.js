import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import cartRouter from "./router/carts.router.js"
import mongoose from "mongoose"
import usersRouter from "./router/users.router.js"
import productRouter from "./router/products.router.js"
import productsModel from "./models/products.model.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from "connect-mongo"
import initializePassport from "../src/config/passport.config.js"
import passport from "passport"
import viewRouter from "./router/view.router.js"
import usersViewRouter from "./router/users.views.router.js"
import sessionsRouter from "./router/session.router.js"
import githubLoginViewRouter from './router/github-login.views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

const DB = "mongodb+srv://gabrielraul16:Rgccgr129@cluster0.zdrnglc.mongodb.net/?retryWrites=true&w=majority"

app.use(session({
  store: MongoStore.create({
    mongoUrl: DB,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 10
  }),
  secret:"elsecreto",
  resave:false,
  saveUninitialized:false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use("/", viewRouter)
app.use("/users", usersViewRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/github", githubLoginViewRouter);


const PORT = 9090 ;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor express en puerto ${PORT}`)
  })

const connectMongoDB = async () =>{
  try{
    await mongoose.connect(DB);
    console.log('Conexión exitosa a MongoDB utilizando Mongoose');

    let products = await productsModel.paginate({}, {limit: 10, page: 1});


  } catch (error) {
    console.error("No se pudo conectar a la BD con Mongoose:" + error);
    process.exit();
  }
}

connectMongoDB();









app.use(cookieParser());



app.use(express.static(__dirname + "/public"))






