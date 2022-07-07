/*
  Path: /api/mensajes
*/
const { Router } = require("express");

// Middlewares
const { validarJWT } = require("../middlewares/validar-jwt");

// Controllers
const { obtenerChat } = require("../controllers/mensajes");

const router = Router();

router.get("/:de", validarJWT, obtenerChat);

module.exports = router;
