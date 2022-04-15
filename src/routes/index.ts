import express from 'express';
import users from '@/routes/users';
import quests from "@/routes/quests";
import tasks from "@/routes/tasks";
const router = express.Router();

router.use('/user', users)
router.use('/quest', quests)
router.use('/task', tasks)

export default router
