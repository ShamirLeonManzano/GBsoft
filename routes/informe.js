import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { check } from 'express-validator'
import informeControllers from '../controllers/informe.js';
import {Router} from 'express';
import { existeInformeById, existeTipo, existeInformeByCod, existeUsuarioById } from '../helpers/informe.js';


const router = Router ();

router.get('/',[
    validarJWT,
    validarCampos
],informeControllers.informeGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeInformeById),
    validarCampos
],informeControllers.informeGetById);  

router.post('/',[
    validarJWT,
    check('tipo').custom(existeTipo),
    check('tipo', 'El tipo es obligatorio').notEmpty(),
    check('codigo').custom(existeInformeByCod),
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('usuario', 'El usuario es obligatorio').notEmpty(),
    check('usuario').custom(existeUsuarioById),
    check('usuario', 'No es un ID válido').isMongoId(),
    check('total', 'El total es obligatorio').notEmpty(),
    check('totalA', 'El total de Asistencia es obligatorio').notEmpty(),
    check('totalC', 'El total de Conversiones es obligatorio').notEmpty(),
    check('totalAD', 'El total de Asistencia Dominical es obligatorio').notEmpty(),
    check('totalF', 'El total de Finanzas es obligatorio').notEmpty(),
    check('detalle', 'Detalle es obligatorio').notEmpty(),
    validarCampos 
],informeControllers.informePost)

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeInformeById),
    validarCampos
],informeControllers.informePutActivar)

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeInformeById),
    validarCampos
],informeControllers.informePutDesactivar)

export default router;