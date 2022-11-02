import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import todos from './todos/todos.routes';
import usuarios from './usuarios/usuarios.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API OK',
  });
});

router.use('/todos', todos);
router.use('/usuarios', usuarios);

export default router;
