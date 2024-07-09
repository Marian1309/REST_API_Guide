import mongoose from 'mongoose';

import { GenericObject } from '@/types';

const UserSchema = new mongoose.Schema({
  username: {
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

export const createUser = (values: GenericObject) => new userModel(values);

export const deleteUserById = (id: string) =>
  userModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: GenericObject) =>
  userModel.findByIdAndUpdate(id, values);
