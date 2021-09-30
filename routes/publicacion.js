import {Router} from 'express';
import publicacionControllers from '../controllers/publicacion.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { existePublicacionById } from '../helpers/publicacion.js';
import {check} from 'express-validator' 
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router ();

router.get('/',[
    validarJWT
],publicacionControllers.publicacionGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePublicacionById),
    validarCampos
],publicacionControllers.publicacionGetById);

router.post('/',[
    validarJWT,
    check('titulo', 'El titulo es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    validarCampos
],publicacionControllers.publicacionPost);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePublicacionById),
    validarCampos
],publicacionControllers.publicacionPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePublicacionById),
    validarCampos
],publicacionControllers.publicacionPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePublicacionById),
    validarCampos
],publicacionControllers.publicacionPutDesactivar);

router.post('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePublicacionById),
    validarCampos
],publicacionControllers.cargarArchivoCloud);

router.get('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePublicacionById),
    validarCampos
],publicacionControllers.traerImagenesCloud)

export default router;