import express, {Request, Response} from 'express'
import {login, register} from "@/controllers/users";
import { getInfo } from "@/controllers/info";
const router = express.Router();

router.get('/', getInfo)

export default router
