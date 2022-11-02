import { WithId } from 'mongodb';
import * as z from 'zod';
import * as randomPassword from "secure-random-password";


import { db } from '../../db';

export const Usuario = z.object({
  name: z.string(),
  identification: z.string(),
  email: z.string().email()
});

export type Usuario = z.infer<typeof Usuario>;
export type UsuarioWithId = WithId<Usuario>;
export const Usuarios = db.collection<Usuario>('usuarios');
