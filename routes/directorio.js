import {Router} from 'express';
import perDirectorioControllers from '../controllers/perDirectorio.js';

const router = Router ();
router.get('/',perDirectorioControllers.perDirectorioGet);

router.get('/:id',perDirectorioControllers.perDirectorioGetById);

router.get('/grupoBiblico/:id',perDirectorioControllers.perDirectorioGetByGB);

router.post('/',perDirectorioControllers.perDirectorioPost);

router.put('/:id',perDirectorioControllers.perDirectorioPut);

router.put('/activar/:id',perDirectorioControllers.perDirectorioPutActivar);

router.put('/desactivar/:id',perDirectorioControllers.perDirectorioPutDesactivar);

export default router;