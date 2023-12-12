const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const http = require("http");
const server = http.createServer(app);
const ManagerMongo = require("./config/db");
const Chat = require("./dao/mongo/models/chatModels");
const passport = require("passport");
const initializePassport = require("./config/passport");
const config = require("./config/config");
const { addLogger } = require("./config/logger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUIExpress = require("swagger-ui-express");

const PORT = config.port;
const MONGOURL = config.mongourl;
const SESSIONSECRET = config.sessionsecret;

//SOCKET
const { Server } = require("socket.io");
const io = new Server(server);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion API TiendaLaurenti",
      description: "Documentacion con Swagger de API TiendaLaurenti",
    },
  },
  apis: [`src/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continuar con la siguiente función de middleware
  }
  res.redirect("/auth/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
};

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOURL,
    }),
    secret: SESSIONSECRET,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

let mensajes = [];

//CONEXION A BASE DE DATOS
const databaseConnect = new ManagerMongo(MONGOURL);

//INICIALIZAR SOCKET EN EL SERVIDOR
io.on("connection", (socket) => {
  Chat.find({})
    .lean()
    .then((respuesta) => {
      messages = respuesta;
      io.sockets.emit("chats", messages);
    })
    .catch((err) => socket.emit("estado", err));
});

//Middleware para mostrar chats actualizados
const middlewareMuestraChats = async () => {
  Chat.find({})
    .lean()
    .then((msjs) => {
      mensajes = msjs;
      io.emit("chats", mensajes);
    })
    .catch((err) => io.emit("estado", err));
};

const handlebars = require("express-handlebars");
const routerProducts = require("./routes/products.routes");
const routerCarts = require("./routes/carts.routes");
const routerChats = require("./routes/chats.routes");
const routerAuth = require("./routes/auth.routes");
const routerSession = require("./routes/sessions.routes");
const routerMocking = require("./routes/mocking.routes");
const routerUser = require("./routes/user.routes");
const { default: mongoose } = require("mongoose");
const { initialController } = require("./controllers/raiz.controllers");

app.use("/products", routerProducts);
app.use("/carts", routerCarts);
app.use("/chat", routerChats, middlewareMuestraChats);
app.use("/auth", routerAuth);
app.use("/sessions", routerSession);
app.use("/mockingproducts", routerMocking);
app.use("/users", routerUser);

//CARPETA PUBLICA ARCHIVOS ESTATICOS
app.use(express.static(__dirname + "/public"));

//CONFIGURACION HANDLEBARS VIEWS Y IMAGES
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("images", __dirname + "/images");
app.set("view engine", "handlebars");

const hbs = handlebars.create({});

hbs.handlebars.registerHelper('eq', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

app.get("/loggertest", (req, res) => {
  req.logger.fatal("Probando Fatal");
  req.logger.error("Probando error");
  req.logger.warning("Probando Warning");
  req.logger.info("Probando info");
  req.logger.http("Probando HTTP");
  req.logger.debug("Probando debug");
});

app.get("/", ensureAuthenticated, initialController);

//INICIO SERVIDOR Y CONECTO A DATABASE
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  databaseConnect.connect();
});
