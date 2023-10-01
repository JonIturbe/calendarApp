// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarJwt } = require("../middlewares/validar-jwt");
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

router.post("/new",
    [ // middlewares
        check("name", "The Name is mandatory").not().isEmpty(),
        check("email", "The email is mandatory").isEmail(),
        check("password", "The password is mandatory").isLength({ min:5 }),
        validarCampos
    ],
    crearUsuario
);

router.post("/",
    [
        check("email", "The email is mandatory").isEmail(),
        check("password", "The password is mandatory").isLength({ min:5 }),
        validarCampos
    ],
    loginUsuario
);

router.get("/renew", validarJwt, revalidarToken);


module.exports = router;