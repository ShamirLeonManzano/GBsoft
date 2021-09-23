import {Router} from 'express';
import subRedControllers from '../controllers/subRed.js';

const router = Router ();

router.post('/',subRedControllers.subRedPost);

router.get('/',subRedControllers.subRedGet);

router.get('/:id',subRedControllers.subRedGetById);

router.get('/red/:id',subRedControllers.subRedGetByRed); 

router.put('/:id',subRedControllers.subRedPut);

router.put('/activar/:id',subRedControllers.subRedPutActivar);

router.put('/desactivar/:id',subRedControllers.subRedPutDesactivar);

export default router;

