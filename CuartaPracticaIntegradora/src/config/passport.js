const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const githugStrategy = require("passport-github2").Strategy;
const userModel = require("../dao/mongo/models/userModel");
const { createHash, isValidPassword } = require("../utils/bcrypts");
const config = require('./config')
const { findUser, createUser } = require("../dao/mongo/users.mongo");

const CLIENTID = config.clientid;
const CLIENTSECRET = config.clientsecret;
const CALLBACKURL = config.callbackurl;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "username" },
      async (req, username, password, done) => {
        try {
          let userData = req.body;
          let user = await findUser(username);
          if (user) {
            req.logger.error('El usuario ya existe')
            done(null, false);
          }

          //Si no existe lo creo. Utilizo toda la info que le envio del body pero con la clave hasheada
          userData.password = createHash(userData.password);

          let result = await createUser(userData);
          return done(null, result);
        } catch (error) {
          return done("Error al crear usuario" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "username" },
      async (req, username, password, done) => {
        try {
          let userData = req.body;

          let user = await findUser(username);
          if (isValidPassword(user, userData.password)) {
            return done(null, user);
          } else {
            req.logger.error(`Error de login`)
            return done("Error de login");
          }
        } catch (error) {
          req.logger.error(`Error al loguear usuario: ${error}`)
          return done("Error al loguear usuario" + error);
        }
      }
    )
  );

  passport.use(
    "auth-github",
    new githugStrategy(
      {
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL: CALLBACKURL,
      },
      async function (accessToken, refreshToken, profile, done) {
        let username = `${profile.id}@github.com`;

        let user = await findUser(username);
        if (user) {
          done(null, user);
        } else {
          let newUser = {
            username: username,
            password: "Nopass",
            nombre: profile.displayName.split(" ")[0] ?? "Sin Nombre",
            apellido: profile.displayName.split(" ")[1] ?? "Sin apellido",
          };
          let result = await createUser(newUser);
          return done(null, result);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

module.exports = initializePassport;
