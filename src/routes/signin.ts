import express, {Request, Response} from 'express'
import {login} from "@/controllers/users";
import auth from "@/middleware/auth";
import { new_token } from "@/controllers/tokens";
const router = express.Router();

router.post('/', login)
router.post('/new_token', new_token)

export default router
