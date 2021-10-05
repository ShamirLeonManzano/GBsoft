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
    check('totalF', 'El total  es obligatorio').notEmpty(),
    check('fGrupo', 'El fGrupo  es obligatorio').notEmpty(),
    check('fAyudante', 'El fAyudante  es obligatorio').notEmpty(),
    check('fAnfitrion', 'El fAnfitrion  es obligatorio').notEmpty(),
    check('fMaestro', 'El fMaestro  es obligatorio').notEmpty(),
    check('felipes', 'El felipes  es obligatorio').notEmpty(),
    check('discipulos', 'El discipulos  es obligatorio').notEmpty(),
    check('amigosA', 'El amigosA  es obligatorio').notEmpty(),
    check('niñosA', 'El niñosA  es obligatorio').notEmpty(),
    check('reconciliados', 'El reconciliados es obligatorio').notEmpty(),
    check('nuevos', 'El nuevos es obligatorio').notEmpty(),
    check('adultos', 'El adultos es obligatorio').notEmpty(),
    check('niñosC', 'El niñosC es obligatorio').notEmpty(),
    check('hermanos', 'El hermanos es obligatorio').notEmpty(),
    check('amigosAD', 'El amigosAD  es obligatorio').notEmpty(),
    check('niñosAD', 'El niñosAD es obligatorio').notEmpty(),    
    check('diezmo', 'El diezmo es obligatorio').notEmpty(),    
    check('ofrenda', 'El ofrenda es obligatorio').notEmpty(),    
    check('otros', 'El otros es obligatorio').notEmpty(),    
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