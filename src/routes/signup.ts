import express, {Request, Response} from 'express'
import {login, register} from "@/controllers/users";
const router = express.Router();

const placeholder = async (req: Request, res: Response) => {
    await res.json({
        response: 'Hello world!'
    })
}

router.post('/', register)

export default router
