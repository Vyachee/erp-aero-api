import express, {Request, Response} from 'express'
import {login, register} from "@/controllers/users";
const router = express.Router();

const placeholder = async (req: Request, res: Response) => {
    await res.json({
        response: 'Hello world!'
    })
}

router.post('/upload', placeholder)
router.get('/list', placeholder)
router.delete('/delete/:id', placeholder)
router.get('/file/:id', placeholder)
router.get('/download/:id', placeholder)
router.put('/update/:id', placeholder)

export default router
