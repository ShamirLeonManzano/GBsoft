import {Router} from 'express';
import grupoBiblicoControllers from '../controllers/grupoBiblico.js'; 
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {existeGrupoByGbId, existeGrupoByCod, existeRedById, existeSubRedById, existeFelipeGById } from '../helpers/grupoBiblico.js'
import {check} from 'express-validator'
const router = Router ();

router.get('/',[
    validarJWT,
    validarCampos
],grupoBiblicoControllers.grupoBiblicoGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeGrupoByGbId),
    validarCampos
],grupoBiblicoControllers.grupoBiblicoGetById);

router.get('/user/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeGrupoByGbId),
    validarCampos
],grupoBiblicoControllers.grupobiblicoGetByUser);

router.post('/',[
    validarJWT,
    check('titulo','El titulo es obligatorio').notEmpty(),
    check('codigo','El codigo es obligatorio').notEmpty(),
    check('codigo').custom(existeGrupoByCod), 
    check('direccion','La direccion es obligatoria').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('red','El id de Red es obligatorio').notEmpty(),
    check('red','El id no es válido').isMongoId(),
    check('red').custom(existeRedById), 
    check('subRed','El Id de Sub Red es obligatorio').notEmpty(),
    check('subRed','El Id no es válido').isMongoId(),
    check('subRed').custom(existeSubRedById),  
    check('felipeG','El ID de felipe Grupo es obligatorio').notEmpty(),
    check('felipeG','El ID no es válido').isMongoId(),
    check('felipeG').custom(existeFelipeGById),  
    validarCampos
],grupoBiblicoControllers.grupoBiblicoPost);

router.put('/:id',[
    validarJWT,
    check('titulo','El titulo es obligatorio').notEmpty(),
    check('codigo','El codigo es obligatorio').notEmpty(),
    check('codigo').custom(existeGrupoByCod), 
    check('direccion','La direccion es obligatoria').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('red','El id de Red es obligatorio').notEmpty(),
    check('red','El id no es válido').isMongoId(),
    check('red').custom(existeRedById), 
    check('subRed','El Id de Sub Red es obligatorio').notEmpty(),
    check('subRed','El Id no es válido').isMongoId(),
    check('subRed').custom(existeSubRedById),  
    check('felipeG','El ID de felipe Grupo es obligatorio').notEmpty(),
    check('felipeG','El ID no es válido').isMongoId(),
    check('felipeG').custom(existeFelipeGById),  
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeGrupoByGbId),
    validarCampos
],grupoBiblicoControllers.grupoBiblicoPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeGrupoByGbId),
    validarCampos
],grupoBiblicoControllers.grupoBiblicoPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeGrupoByGbId), 
    validarCampos
],grupoBiblicoControllers.grupoBiblicoPutDesactivar);

export default router;