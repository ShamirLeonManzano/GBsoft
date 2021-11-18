import {Router} from 'express';
import perDirectorioControllers from '../controllers/perDirectorio.js';
import {validarJWT} from '../middlewares/validar-jwt.js'
import {check} from 'express-validator'
import {existeDirectorioById,existeDirectorioByGbId, existePersonaByNombre} from '../helpers/directorio.js'
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router ();
router.get('/',[ 
    validarJWT,
    validarCampos
],perDirectorioControllers.perDirectorioGet);

router.get('/:id',[ 
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDirectorioById),
    validarCampos      
],perDirectorioControllers.perDirectorioGetById);

router.get('/grupoBiblico/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDirectorioByGbId),
    validarCampos 
],perDirectorioControllers.perDirectorioGetByGB);

router.post('/',[
    validarJWT,
    check('gBiblico','El grupo Biblico es obligatorio').notEmpty(), 
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('cumpleaños','El cumpleaños es obligatorio').notEmpty(),
    check('direccion','El direccion es obligatorio').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('email','El email es obligatorio').notEmpty(),
    check('nombre').custom(existePersonaByNombre),
    validarCampos
],perDirectorioControllers.perDirectorioPost);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('cumpleaños','El cumpleaños es obligatorio').notEmpty(),
    check('direccion','El direccion es obligatorio').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('email','El email es obligatorio').notEmpty(),
    check('nombre').custom(existePersonaByNombre),
    check('id', 'No es un ID válido').isMongoId(),
    check('gBiblico').custom(existeDirectorioByGbId),
    validarCampos
],perDirectorioControllers.perDirectorioPut);

// router.put('/activar/:id',[
//     validarJWT,
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom(existeDirectorioByGbId),
//     validarCampos
// ],perDirectorioControllers.perDirectorioPutActivar);

// router.put('/desactivar/:id',[
//     validarJWT,
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom(existeDirectorioByGbId),
//     validarCampos
// ],perDirectorioControllers.perDirectorioPutDesactivar);

router.delete('/delete/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDirectorioById),
    validarCampos
],perDirectorioControllers.perDirectorioDelete);

export default router;