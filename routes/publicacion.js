import {Router} from 'express';
import publicacionControllers from '../controllers/publicacion.js';

const router = Router ();

router.get('/',publicacionControllers.publicacionGet);

router.get('/:id',publicacionControllers.publicacionGetById);

router.post('/',publicacionControllers.publicacionPost);

router.put('/:id',publicacionControllers.publicacionPut);

router.put('/activar/:id',publicacionControllers.publicacionPutActivar);

router.put('/desactivar/:id',publicacionControllers.publicacionPutDesactivar);

export default router;