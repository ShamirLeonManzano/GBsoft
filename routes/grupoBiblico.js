import {Router} from 'express';
import grupoBiblicoControllers from '../controllers/grupoBiblico.js'; 

const router = Router ();

router.get('/',grupoBiblicoControllers.grupoBiblicoGet);

router.get('/:id',grupoBiblicoControllers.grupoBiblicoGetById);

router.post('/',grupoBiblicoControllers.grupoBiblicoPost);

router.put('/:id',grupoBiblicoControllers.grupoBiblicoPut);

router.put('/activar/:id',grupoBiblicoControllers.grupoBiblicoPutActivar);

router.put('/desactivar/:id',grupoBiblicoControllers.grupoBiblicoPutDesactivar);

export default router;