const express = require("express");
const { Router } = express;
const {
  showCartController,
  addToCartController,
  deleteAllProductsController,
  deleteOneProductController,
  updateQuantityController,
  purchaseController,
} = require("../controllers/carts.controller");

const router = new Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no es autenticado!");
  res.status(401).redirect("/auth/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
};

const isUser = (req, res, next) => {
  if (!req.user.admin) {
    return next(); // El usuario es usuario, continuar con la siguiente función de middleware
  }
  req.logger.error("El usuario no tiene los permisos para esta operacion!");
  res.status(401).send({
    status: "ERROR",
    message: "No tiene los permisos para esa operacion",
  });
};

router.use(ensureAuthenticated);

router.get("/:usuario", showCartController);
router.get("/:cid/purchase", purchaseController);
router.post("/:usuario/:pid", isUser, addToCartController);
router.delete("/:cid", isUser, deleteAllProductsController);
router.delete("/:cid/products/:pid", isUser, deleteOneProductController);
router.put("/:cid/products/:pid", isUser, updateQuantityController);

module.exports = router;
