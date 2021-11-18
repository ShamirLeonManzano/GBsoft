import {Router} from 'express';
import iglesiaControllers from '../controllers/iglesia.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeIglesiaById, existeIglesiaByCod } from '../helpers/iglesia.js';
import { check } from 'express-validator'

const router = Router ();

router.get('/',[
    validarJWT, 
    validarCampos
],iglesiaControllers.iglesiaGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIglesiaById),
    validarCampos
],iglesiaControllers.iglesiaGetById);

router.post('/',[
    validarJWT,
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('titulo', 'El titulo es obligatorio').notEmpty(),
    check('codigo').custom(existeIglesiaByCod),
    validarCampos
],iglesiaControllers.iglesiaPost);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIglesiaById),
    check('codigo','El codigo es obligatorio').notEmpty(),
    check('codigo').custom(existeIglesiaByCod),
    validarCampos
],iglesiaControllers.iglesiaPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIglesiaById),
    validarCampos
],iglesiaControllers.iglesiaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIglesiaById),
    validarCampos
],iglesiaControllers.iglesiaPutDesactivar);

router.post('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIglesiaById),
    validarCampos
],iglesiaControllers.cargarArchivoCloud);

router.get('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIglesiaById),
    validarCampos
],iglesiaControllers.traerImagenesCloud)

export default router;