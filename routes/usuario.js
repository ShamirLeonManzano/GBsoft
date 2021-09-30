import {Router} from 'express';
import usuarioControllers from '../controllers/usuario.js';
import { check } from 'express-validator'
import validarExistaArchivo from '../middlewares/validar-exista-archivo.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {existeUsuarioById, existeUsuarioByCodigo, existeUsuarioByEmail} from '../helpers/usuarios.js'

const router = Router ();

router.get('/',[
    validarJWT,
    validarCampos
],usuarioControllers.usuarioGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
],usuarioControllers.usuarioGetById);

router.post('/',[
    validarJWT,
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('rol', 'El rol es obligatorio').notEmpty(),
    check('telefono', 'El telefono es obligatorio').notEmpty(),
    check('codigo').custom(existeUsuarioByCodigo),
    check('email').custom(existeUsuarioByEmail),
    validarCampos
],usuarioControllers.usuarioPost);

router.post('/uploadCloud/:id',[
    validarJWT,
    validarExistaArchivo,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuarioControllers.cargarArchivoCloud);

router.post('/upload/:id',[validarExistaArchivo],usuarioControllers.cargarArchivo);

router.put('/:id',[
    validarJWT,
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('rol', 'El rol es obligatorio').notEmpty(),
    check('telefono', 'El telefono es obligatorio').notEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuarioControllers.usuarioPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuarioControllers.usuarioPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuarioControllers.usuarioPutDesactivar);

router.get('/uploadCloud/:id',[],usuarioControllers.traerImagenesCloud)

router.post('/login',[
    check('email','El email es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
],usuarioControllers.login);

export default router;