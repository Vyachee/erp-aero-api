import express from 'express';
import signin from '@/routes/signin';
import signup from "@/routes/signup";
import file from "@/routes/file";
import info from "@/routes/info";
import logout from "@/routes/logout";
import auth from "@/middleware/auth";
import multer from "multer";

const router = express.Router();

router.use('/signin', multer().none(), signin)
router.use('/signup', multer().none(), signup)
router.use('/file', auth, file)
router.use('/info', auth, info)
router.use('/logout', auth, logout)

export default router
