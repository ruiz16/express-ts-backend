import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as UsuarioHandler from './usuarios.handlers';
import { Usuario } from './usuarios.model';

const router = Router();

router.get('/', UsuarioHandler.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsuarioHandler.findOne,
);
router.post(
  '/',
  validateRequest({
    body: Usuario,
  }),
  UsuarioHandler.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Usuario,
  }),
  UsuarioHandler.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsuarioHandler.deleteOne,
);

export default router;
