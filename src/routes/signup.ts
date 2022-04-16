import express, {Request, Response} from 'express'
import {login, register} from "@/controllers/users";
const router = express.Router();

router.post('/', register)

export default router
