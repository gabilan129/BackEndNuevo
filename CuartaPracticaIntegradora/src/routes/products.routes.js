const express = require("express");
const { Router } = express;
const {
  createProductController,
  showErrorController,
  showSuccessController,
  deleteProductController,
  updateProductController,
  showCreateProductController,
  showUpdateProductController,
} = require("../controllers/products.controller");

const router = new Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no esta autenticado!");
  res.status(401).redirect("/auth/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
};

const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    return next(); // El usuario es administrador, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no tiene los permisos para esta operacion!");
  res.status(401).render("roleerror");
};

const isAdminOrPremium = (req, res, next) => {
  if (req.user.admin || req.user.premium) {
    return next(); // El usuario es administrador o usuario premium, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no tiene los permisos para esta operacion!");
  res.status(401).render("roleerror");
};

router.use(ensureAuthenticated);

router.get("/success", showSuccessController);
router.get("/createproduct", isAdminOrPremium, showCreateProductController);
router.get(
  "/updateproduct/:pid",
  isAdminOrPremium,
  showUpdateProductController
);
router.get("/error/", showErrorController);
router.post("/", isAdminOrPremium, createProductController);
router.delete("/:pid", isAdminOrPremium, deleteProductController);
router.put("/:pid", isAdminOrPremium, updateProductController);

module.exports = router;
