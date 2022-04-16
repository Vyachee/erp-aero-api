import express from 'express'
import { logout } from "@/controllers/users";
import multer from "multer";
const router = express.Router();

router.post('/', multer().none(), logout)

export default router
