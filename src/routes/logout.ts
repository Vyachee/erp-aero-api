import express from 'express'
import { logout } from "@/controllers/users";
const router = express.Router();

router.post('/', logout)

export default router
