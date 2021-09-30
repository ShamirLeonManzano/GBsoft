import {Router} from 'express';
import grupoBiblicoControllers from '../controllers/grupoBiblico.js'; 
import { validarJWT } from '../middlewares/validar-jwt.js';
const router = Router ();

router.get('/',[
    validarJWT
],grupoBiblicoControllers.grupoBiblicoGet);

router.get('/:id',[
    validarJWT
],grupoBiblicoControllers.grupoBiblicoGetById);

router.post('/',[
    validarJWT
],grupoBiblicoControllers.grupoBiblicoPost);

router.put('/:id',[
    validarJWT
],grupoBiblicoControllers.grupoBiblicoPut);

router.put('/activar/:id',[
    validarJWT
],grupoBiblicoControllers.grupoBiblicoPutActivar);

router.put('/desactivar/:id',[
    validarJWT
],grupoBiblicoControllers.grupoBiblicoPutDesactivar);

export default router;