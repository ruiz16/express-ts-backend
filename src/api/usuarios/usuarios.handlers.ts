import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { UsuarioWithId, Usuarios, Usuario } from './usuarios.model';

export async function findAll(req: Request, res: Response<UsuarioWithId[]>, next: NextFunction) {
  try {
    const usuarios = await Usuarios.find().toArray();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
}

export async function createOne(req: Request<{}, UsuarioWithId, Usuario>, res: Response<UsuarioWithId>, next: NextFunction) {
  try {
    console.log(req.body);
    
    const insertResult = await Usuarios.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting user.');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);    
  }
}

export async function findOne(req: Request<ParamsWithId, UsuarioWithId, {}>, res: Response<UsuarioWithId>, next: NextFunction) {
  try {
    const result = await Usuarios.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`User with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, UsuarioWithId, Usuario>, res: Response<UsuarioWithId>, next: NextFunction) {
  try {
    const result = await Usuarios.findOneAndUpdate({
      _id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`User with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
  try {
    const result = await Usuarios.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`User with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  } 
}