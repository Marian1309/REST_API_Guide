import type { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash';

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
