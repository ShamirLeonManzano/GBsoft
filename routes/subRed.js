import {Router} from 'express';
import { check } from 'express-validator'
import subRedControllers from '../controllers/subRed.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeSubRedByCodigo, existeSubRedById, existeSubRedByRedId, } from '../helpers/subRed.js';


const router = Router ();

router.post('/',[
    validarJWT,
    check('codigo', 'El código es obligatorio').notEmpty(),
    check('red', 'El red es obligatorio').notEmpty(),
    check('felipeR', 'El felipe de Red es obligatorio').notEmpty(),
    check('codigo').custom(existeSubRedByCodigo),    
    validarCampos,
],subRedControllers.subRedPost);

router.get('/',[
    validarJWT,
    validarCampos
],subRedControllers.subRedGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedById),
    validarCampos
    
],subRedControllers.subRedGetById);

router.get('/red/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedByRedId),
    validarCampos     
],subRedControllers.subRedGetByRed); 

router.put('/:id',[
    validarJWT,
    check('codigo', 'El código es obligatorio').notEmpty(),
    check('red', 'El red es obligatorio').notEmpty(),
    check('felipeR', 'El felipe de Red es obligatorio').notEmpty(),
    check('codigo').custom(existeSubRedByCodigo), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedById),   
    validarCampos,
],subRedControllers.subRedPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedByRedId),
    validarCampos
],subRedControllers.subRedPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedByRedId),
    validarCampos
],subRedControllers.subRedPutDesactivar);

router.post('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedById),
    validarCampos
],subRedControllers.cargarArchivoCloud);

router.get('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSubRedById),
    validarCampos
],subRedControllers.traerImagenesCloud)

export default router;

