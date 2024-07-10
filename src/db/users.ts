import mongoose from 'mongoose';

import type { User } from '@/types';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  authentification: {
    password: {
      type: String,
      required: true,
      select: false
    },
    salt: {
      type: String,
      select: false
    },
    sessionToken: { type: String, select: false }
  }
});

export const userModel = mongoose.model('User', UserSchema);

export const getUsers = () => userModel.find();

export const getUserByEmail = (email: string) => userModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({
    'authentification.sessionToken': sessionToken
  });

export const getUserById = (id: string) => userModel.findById(id);

export const createUser = async (values: User) => {
  const user = new userModel(values);
  await user.save();

  return user;
};

export const deleteUserById = (id: string) =>
  userModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: User) =>
  userModel.findByIdAndUpdate(id, values);
