const express = require("express");
const {
  changeMembershipController,
  showUploadFilesController,
  UploadFilesController,
} = require("../controllers/user.controllers");
const { Router } = express;
const { uploader } = require("../utils/multer");

const router = new Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no esta autenticado!");
  res.status(401).redirect("/auth/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
};

router.get("/premium/:uid", ensureAuthenticated, changeMembershipController);
router.get("/:uid/documents", ensureAuthenticated, showUploadFilesController);
router.post(
  "/:uid/documents",
  ensureAuthenticated,
  uploader.fields([
    { name: "imagenperfil", maxCount: 1 },
    { name: "imagenproducto", maxCount: 1 },
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadocuenta", maxCount: 1 },
  ]),
  UploadFilesController
);

module.exports = router;
