// Rutas de eventos / events
// host + /api/events

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

// aplica el middleware validarJwt a todas las rutas bajo esta linea
router.use( validarJwt );

router.get("/", getEvents);

router.post("/new", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;