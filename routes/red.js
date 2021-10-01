import {Router} from 'express';
import redControllers from '../controllers/red.js';
import {validarJWT} from '../middlewares/validar-jwt.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { check } from 'express-validator';
import { existeRedById, existeRedByCodigo, existeRedByUserId, existeRedByIglesiaId } from '../helpers/red.js';

const router = Router ();

router.get('/',[
    validarJWT,
    validarCampos
],redControllers.redGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRedById),
    validarCampos
],redControllers.redGetById);

router.post('/',[
    validarJWT,
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('codigo').custom(existeRedByCodigo),
    check('iglesia', 'La iglesia es obligatoria').notEmpty(),
    check('iglesia', 'No es un ID válido').isMongoId(),
    check('iglesia').custom(existeRedByIglesiaId),
    check('felipeS', 'El felipeS es obligatorio').notEmpty(),
    check('felipeS', 'No es un ID válido').isMongoId(),
    check('felipeS').custom(existeRedByUserId),
    check('titulo', 'El titulo es obligatorio').notEmpty(),
    validarCampos
],redControllers.redPost);

router.put('/:id',[
    validarJWT,
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('iglesia', 'La iglesia es obligatoria').notEmpty(),
    check('felipeS', 'El felipeS es obligatorio').notEmpty(),
    check('codigo').custom(existeRedByCodigo),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRedById),
    validarCampos
],redControllers.redPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRedById),
    validarCampos
],redControllers.redPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRedById),
    validarCampos
],redControllers.redPutDesactivar);

router.post('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRedById),
    validarCampos
],redControllers.cargarArchivoCloud);

router.get('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRedById),
    validarCampos
],redControllers.traerImagenesCloud)

export default router;