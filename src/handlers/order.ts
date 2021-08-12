import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../middleware/verifyAuth';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      userId: req.body.id_user
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json(err.toString());
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json(err.toString());
  }
};

const removeProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;

  try {
    const removedProduct = await store.removeProduct(orderId, productId);
    res.json(removedProduct);
  } catch (err) {
    res.status(400).json(err.toString());
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  app.delete('/orders/:id/products', verifyAuthToken, removeProduct);
};

export default orderRoutes;
