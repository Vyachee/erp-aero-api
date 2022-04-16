import { Response } from "express";
import { RequestWithUser } from "@/types";
import File from "@/models/File";
import path from 'path';

require('dotenv').config();


export const uploadFile = async (req: RequestWithUser & { fileValidationError?: string }, res: Response) => {
    try {
        if(!req.user) throw new Error("Not authorized")
        if(!req.file) throw new Error("File not provided")
        if(req.fileValidationError) throw new Error(req.fileValidationError)

        const {title} = req.body
        if(!title) throw new Error("Title not provided")

        console.log(1)
        const uploadedFile = await File.query().insertAndFetch({
            user_id: req.user.id,
            title: req.body.title,
            extension: path.extname(req.file?.originalname || ""),
            mime: req.file?.mimetype,
            size: BigInt(req.file?.size || 0),
            upload_date: new Date()
        })
        console.log(2)

        await res.json({
            success: true,
            data: uploadedFile
        })

    }   catch (e: any) {
        console.log(e)
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

