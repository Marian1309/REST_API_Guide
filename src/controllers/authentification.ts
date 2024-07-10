import type { Request, Response } from 'express';

import { RequestFn } from '@/types';

import { createUser, getUserByEmail } from '@/services/user';

import { authentification, random } from '@/helpers/auth';

export const register: RequestFn = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      return res.json({ message: 'all fields are not provided' });
    }

    const isUserExists = await getUserByEmail(email);
    if (isUserExists) {
      return res.json({ message: 'user exists' });
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
    return res.status(404).json({ message: 'route not found' });
  }
};

export const login: RequestFn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ messge: 'There is no email or password' });
    }

    const user = await getUserByEmail(email).select(
      '+authentification.salt +authentification.password'
    );

    if (!user) {
      return res.json({ message: 'There is no user' });
    }

    const expectedHash = authentification(user.authentification.salt, password);

    if (user.authentification.salt.toString() === expectedHash.toString()) {
      return res.json({ message: 'Salt and Hash are not the same' });
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
    return res.status(404).json({ message: 'route not found' });
  }
};
