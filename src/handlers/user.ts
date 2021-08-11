import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/verifyAuth';
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    newUser.token = token;
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).send('Error: Username or Password missing')
  }
  const user: User = {
    username: req.body.username,
    password: req.body.password
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error.toString());
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

export default userRoutes;
