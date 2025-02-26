import { Router } from "express";
import { check } from "express-validator";
import { createPublication, getPublications, searchPublication, updatePublication, deletePublication } from "./publication.controller.js";
import { existePublicationById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js"
import { validarJWT } from '../middlewares/validar-jwt.js'

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('username', 'Este no es un username valido').not().isEmpty(),
        validarCampos
    ],
    createPublication
)

router.get("/", getPublications)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    searchPublication
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existePublicationById),
        validarCampos
    ],
    updatePublication
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deletePublication
)

export default router;