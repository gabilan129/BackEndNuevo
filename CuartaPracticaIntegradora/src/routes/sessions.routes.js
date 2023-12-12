const express = require("express");
const { Router } = express;
const {
  showCurrentSessionController,
} = require("../controllers/sessions.controller");

const router = new Router();

router.get("/current", showCurrentSessionController);

module.exports = router;
