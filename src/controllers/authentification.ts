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

    const user = await createUser({
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ messge: 'There is o email or password' });
    }

    const user = await getUserByEmail(email).select(
      '+authentification.salt +authentification.password'
    );

    if (!user) {
      return res.json({ message: 'There is no user' });
    }

    const expectedHash = authentification(user.authentification.salt, password);

    if (user.authentification.salt.toString() === expectedHash.toString()) {
      return res.json({ message: 'Hash' });
    }

    const salt = random();

    user.authentification.sessionToken = authentification(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('AUTHENTICATION', user.authentification.sessionToken, {
      domain: 'localhost',
      path: '/'
    });

    return res.status(200).json(user).end();
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};
