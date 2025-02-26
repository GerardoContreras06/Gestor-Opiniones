import { Router } from "express";
import { check } from "express-validator";
import { deleteFileOnError } from '../middlewares/delete-file-on-error.js'
import { createComment, updateComment, deleteComment } from './comment.controller.js'
import { existeCommentById } from '../helpers/db-validator.js'
import { validarCampos } from "../middlewares/validar-campos.js"
import { validarJWT } from '../middlewares/validar-jwt.js'

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('title', 'Este no es un titulo valido').not().isEmpty(),
        validarCampos,
        deleteFileOnError
    ],
    createComment
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCommentById),
        validarCampos,
        deleteFileOnError,
    ],
    updateComment
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
        deleteFileOnError,
    ],
    deleteComment
)

export default router;