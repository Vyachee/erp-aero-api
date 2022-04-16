import express, {Request, Response} from 'express'
import {login} from "@/controllers/users";
import auth from "@/middleware/auth";
import { new_token } from "@/controllers/tokens";
const router = express.Router();

const placeholder = async (req: Request, res: Response) => {
    await res.json({
        response: 'Hello world!'
    })
}

router.post('/', login)
router.post('/new_token', new_token)

export default router
