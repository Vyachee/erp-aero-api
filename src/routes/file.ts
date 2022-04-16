import express, { Request, Response } from 'express'
import { deleteFile, getList, uploadFile } from "@/controllers/file";
import { getStorage } from "@/utils/StorageHelper";
import multer from "multer";

const router = express.Router();

const placeholder = async (req: Request, res: Response) => {
    await res.json({
        response: 'Hello world!'
    })
}

const storage = getStorage('static/uploads')
const upload = multer({ storage })

router.post('/upload', upload.single('file'), uploadFile)
router.get('/list', getList)
router.delete('/delete/:id', deleteFile)
router.get('/file/:id', placeholder)
router.get('/download/:id', placeholder)
router.put('/update/:id', placeholder)

export default router
