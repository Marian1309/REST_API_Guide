import type { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '@/db/users';

export const isAuthentificated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['AUTHENTICATION'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    next();
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};
