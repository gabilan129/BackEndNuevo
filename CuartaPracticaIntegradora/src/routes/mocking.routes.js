const express = require("express");
const { showMockingController } = require("../controllers/mocking.controller");
const { Router } = express;

const router = new Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no es autenticado!");
  res.status(401).redirect("/auth/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
};

router.use(ensureAuthenticated);

router.get("/", showMockingController);

module.exports = router;
