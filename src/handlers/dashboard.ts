import express, { Request, Response } from 'express';

import { DashboardQueries } from '../service/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/popular-products', mostPopularProducts);
};

const dashboard = new DashboardQueries();

const mostPopularProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.mostPopularProducts();
  res.json(products);
};

export default dashboardRoutes;
