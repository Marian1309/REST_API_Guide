import { isAuthentificated, isOwner } from '@/middlewares';
import { Router } from 'express';

import { deleteUser, getAllUsers, updateUser } from '@/controllers/users';

const router = Router();

router.get('/', isAuthentificated, getAllUsers);
router.delete('/:id', isAuthentificated, isOwner, deleteUser);
router.patch('/:id', isAuthentificated, isOwner, updateUser);

export default router;
