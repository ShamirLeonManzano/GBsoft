import {Router} from 'express';
import iglesiaControllers from '../controllers/iglesia.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router ();

router.get('/',[
    validarJWT
],iglesiaControllers.iglesiaGet);

router.get('/:id',[
    validarJWT
],iglesiaControllers.iglesiaGetById);

router.post('/',[
    validarJWT
],iglesiaControllers.iglesiaPost);

router.put('/:id',[
    validarJWT
],iglesiaControllers.iglesiaPut);

router.put('/activar/:id',[
    validarJWT
],iglesiaControllers.iglesiaPutActivar);

router.put('/desactivar/:id',[
    validarJWT
],iglesiaControllers.iglesiaPutDesactivar);

export default router;