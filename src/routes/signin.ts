import express, {Request, Response} from 'express'
import {login} from "@/controllers/users";
const router = express.Router();

const placeholder = async (req: Request, res: Response) => {
    await res.json({
        response: 'Hello world!'
    })
}

router.post('/', login)
router.post('/new_token', placeholder)

export default router
