const express = require("express");
const { Router } = express;
const passport = require("passport");
const { createHash, isValidPassword } = require("../utils/bcrypts");
const {
  forgotPasswordController,
  loginController,
  getResetPasswordController,
  postResetPasswordController,
  registerController,
  logoutController,
  failedRegisterController,
  roleErrorController,
  showLoginController,
} = require("../controllers/auth.controllers");

const router = new Router();

let users = [];

router.get(
  "/github",
  passport.authenticate("auth-github", { scope: ["user:username"] })
);

router.get(
  "/github/callback",
  passport.authenticate("auth-github", { scope: ["user:username"] }),
  function (req, res) {
    req.logger.info("Usuario autenticado correctamente.");
    res.status(200).redirect("/");
  }
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/auth/login" }),
  loginController
);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/auth/failedregister",
  }),
  (req, res) => {
    res.status(200).redirect("/auth/login");
  }
);

router.get("/login", showLoginController);
router.get("/register", registerController);
router.get("/forgot-password", getResetPasswordController);
router.post("/forgot-password", forgotPasswordController);
router.get("/reset-password/:token", getResetPasswordController);
router.post("/reset-password", postResetPasswordController);
router.get("/logout", logoutController);
router.get("/failedregister", failedRegisterController);
router.get("/roleerror", roleErrorController);

module.exports = router;
