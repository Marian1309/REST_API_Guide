import type { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';

import { MiddlewareFn } from '@/types';

import { getUserBySessionToken } from '@/services/user';

export const isAuthentificated: MiddlewareFn = async (req, res, next) => {
  try {
    const sessionToken = req.cookies['AUTHENTICATION'] as string;

    if (!sessionToken) {
      return res.json({ message: 'sessionToken is missing' });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.json({ message: 'user does not exist' });
    }

    merge(req, { identity: existingUser });

    next();
  } catch (err: unknown) {
    console.log(err);
    return res.status(404).json({ message: 'route not found' });
  }
};

export const isOwner: MiddlewareFn = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.json({ message: 'currentUserId is missing' });
    }

    if (currentUserId.toString() !== id) {
      return res.json({ message: 'currentUser does not equal id' });
    }

    next();
  } catch (err: unknown) {
    console.log(err);
    return res.status(404).json({ message: 'route not found' });
  }
};
