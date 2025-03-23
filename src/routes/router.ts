import express from 'express';
import taskRoutes from './task.routes';
import userRoutes from './user.routes';

const router = express.Router();

// Mount task routes under the /tasks path
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export default router;