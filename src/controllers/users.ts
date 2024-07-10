import { Request, Response } from 'express';

import { RequestFn } from '@/types';

import { deleteUserById, getUserById, getUsers } from '@/services/user';

export const getAllUsers: RequestFn = async (_, res) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (err: unknown) {
    console.log(err);
    return res.status(404).json({ message: 'route not found' });
  }
};

export const deleteUser: RequestFn = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (err: unknown) {
    console.log(err);
    return res.status(404).json({ message: 'route not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    const { id } = req.params;

    if (!userName) {
      return res.json({ message: 'There is no userName' });
    }

    const user = await getUserById(id);

    user.userName = userName;

    await user.save();

    return res.status(200).json(user).end();
  } catch (err: unknown) {
    console.log(err);
    return res.status(404).json({ message: 'route not found' });
  }
};
