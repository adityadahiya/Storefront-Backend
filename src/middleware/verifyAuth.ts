import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    if (req.headers.authorization) {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      next();
    } else {
      throw new Error('Authorization token is not present');
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error.toString());
  }
};
