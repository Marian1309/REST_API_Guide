import crypto from 'crypto';

import { HASH_SECRET } from '@/constants';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentification = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(HASH_SECRET)
    .digest('hex');
};
