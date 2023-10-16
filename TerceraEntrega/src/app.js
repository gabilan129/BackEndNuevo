//import dependencias
import express from 'express';
import {__dirname} from './utils.js';

/* import { Server } from 'socket.io'; */
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

//import router
import productRoutes from './routes/Mongo/product.router.js'
import cartRoutes from './routes/Mongo/cart.router.js';
import usersViewRouter from './routes/Mongo/users.views.router.js';
import userRouter from './routes/Mongo/users.router.js'
import views from './routes/Mongo/view.router.js';
import ticketRouter from './routes/Mongo/ticket.router.js';

//import managers
/* import dotenv from 'dotenv'; */
import configEnv from './config/env.config.js';
import './config/db.js'

//PARA SESSION
import session from 'express-session';

//import for passport
import passport from 'passport';
import initializePassport from './config/passport.config.js';


/* dotenv.config(); */
const app = express();

//Cookies
app.use(cookieParser("CoderS3cr3tC0d3"));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware para archivos estaticos
app.use(express.static(__dirname + '/public'));

//middeleware para passport
initializePassport();
app.use(passport.initialize());

//Config Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//SESSION
app.use(session({
    mongoUrl: configEnv.mongoUrl,
    ttl: 60,
    secret: "coderS3cr3t",
    resave: true, //guarda en memoria
    saveUninitialized: false, 
    //lo guarda apenas se crea
}));

//ROUTERS
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes);  
app.use("/products", views);
app.use("/carts", views);
app.use("/users", usersViewRouter);
app.use("/api/users", userRouter);
app.use("/api/ticket", ticketRouter);


const PORT = configEnv.port ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    });

