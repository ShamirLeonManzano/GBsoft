import {Router} from 'express';
import iglesiaControllers from '../controllers/iglesia.js';

const router = Router ();

router.get('/',iglesiaControllers.iglesiaGet);

router.get('/:id',iglesiaControllers.iglesiaGetById);

router.post('/',iglesiaControllers.iglesiaPost);

router.put('/:id',iglesiaControllers.iglesiaPut);

router.put('/activar/:id',iglesiaControllers.iglesiaPutActivar);

router.put('/desactivar/:id',iglesiaControllers.iglesiaPutDesactivar);

export default router;