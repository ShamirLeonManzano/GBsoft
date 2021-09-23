import {Router} from 'express';
import redControllers from '../controllers/red.js';

const router = Router ();

router.get('/',redControllers.redGet);

router.get('/:id',redControllers.redGetById);

router.post('/',redControllers.redPost);

router.put('/:id',redControllers.redPut);

router.put('/activar/:id',redControllers.redPutActivar);

router.put('/desactivar/:id',redControllers.redPutDesactivar);

export default router;