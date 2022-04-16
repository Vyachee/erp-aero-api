import express, {Request, Response} from 'express'
import {login, register} from "@/controllers/users";
import { getInfo } from "@/controllers/info";
import multer from "multer";
const router = express.Router();

router.get('/', multer().none(), getInfo)

export default router
