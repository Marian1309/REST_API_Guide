import type { NextFunction, Request, Response } from 'express';

export type User = {
  email: string;
  userName: string;
  authentification: {
    password: string;
    salt: string;
    sessionToken?: string;
  };
};

export type MiddlewareFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RequestFn = (req: Request, res: Response) => void;
