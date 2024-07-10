import { Request, Response } from 'express';

import { deleteUserById, getUserById, getUsers } from '@/db/users';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    console.log({ users });

    return res.status(200).json(users);
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    const { id } = req.params;

    if (!userName) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.userName = userName;
    await user.save();

    return res.status(200).json(user).end();
  } catch (err: unknown) {
    console.log(err);
    return res.sendStatus(400);
  }
};
