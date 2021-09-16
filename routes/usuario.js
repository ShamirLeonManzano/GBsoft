import {Router} from 'express';
import usuarioControllers from '../controllers/usuario.js';
import validarExistaArchivo from '../middlewares/validar-exista-archivo.js';

const router = Router ();

router.get('/',usuarioControllers.usuarioGet);

router.get('/:id',usuarioControllers.usuarioGetById);

router.get('/upload/:id',usuarioControllers.mostrarImagen);

router.post('/',usuarioControllers.usuarioPost);

router.post('/upload/:id',usuarioControllers.cargarArchivo);

router.post('/uploadCloud/:id',usuarioControllers.cargarArchivoCloud);

router.post('/upload/:id',[validarExistaArchivo],usuarioControllers.cargarArchivo);

router.put('/:id',usuarioControllers.usuarioPut);

router.put('/activar/:id',usuarioControllers.usuarioPutActivar);

router.put('/desactivar/:id',usuarioControllers.usuarioPutDesactivar);

export default router;