// Rutas de eventos / events
// host + /api/events

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

// aplica el middleware validarJwt a todas las rutas bajo esta linea
router.use( validarJwt );

router.get("/", getEvents);

router.post(
    "/", 
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio Obligatoria").custom( isDate ),
        check("end", "Fecha de finalizacion Obligatoria").custom( isDate ),
        validarCampos
    ],
    createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;