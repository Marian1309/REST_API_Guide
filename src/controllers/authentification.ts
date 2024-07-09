import type { Request, Response } from 'express';

import { createUser, getUserByEmail } from '@/db/users';

import { authentification, random } from '@/helpers/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      return res.sendStatus(400);
    }

    const isUserExists = await getUserByEmail(email);

    if (isUserExists) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = createUser({
      email,
      userName,
      authentification: {
        salt,
        password: authentification(salt, password)
      }
    });

    return res.status(200).json(user).end();
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};
