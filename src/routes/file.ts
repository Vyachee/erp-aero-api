import express, { Request, Response } from 'express'
import { deleteFile, download, getInfo, getList, update, uploadFile } from "@/controllers/file";
import { getStorage } from "@/utils/StorageHelper";
import multer from "multer";

const router = express.Router();

const storage = getStorage('static/uploads')
const upload = multer({ storage })

router.post('/upload', upload.single('file'), uploadFile)
router.get('/list', multer().none(), getList)
router.delete('/delete/:id', multer().none(), deleteFile)
router.get('/download/:id', multer().none(), download)
router.put('/update/:id', upload.single('file'), update)
router.get('/:id', multer().none(), getInfo)

export default router
