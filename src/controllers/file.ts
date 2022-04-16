import { Response } from "express";
import { RequestWithUser } from "@/types";
import File from "@/models/File";
import path from 'path';
import * as fs from "fs";

require('dotenv').config();


export const uploadFile = async (req: RequestWithUser & { fileValidationError?: string }, res: Response) => {
    try {
        if(!req.user) throw new Error("Not authorized")
        if(!req.file) throw new Error("File not provided")
        if(req.fileValidationError) throw new Error(req.fileValidationError)

        const uploadedFile = await File.query().insertAndFetch({
            user_id: req.user.id,
            title: req.file.filename.replace(path.extname(req.file?.originalname || ""), ''),
            extension: path.extname(req.file?.originalname || "").replace('.', ''),
            mime: req.file?.mimetype,
            size: BigInt(req.file?.size || 0),
            upload_date: new Date()
        })

        await res.json({
            success: true,
            data: uploadedFile
        })

    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

export const getList = async (req: RequestWithUser, res: Response) => {
    try {
        if(!req.user) throw new Error("Not authorized")
        const {list_size = 10, page = 1} = req.query

        console.log(list_size, page)
        const files = await File.query()
            .where({user_id: req?.user?.id})
            .limit(Number(list_size))
            .offset((Number(page) - 1) * Number(list_size))
        await res.json({
            success: true,
            data: files
        })


    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}


export const deleteFile = async (req: RequestWithUser, res: Response) => {
    try {
        if(!req.user) throw new Error("Not authorized")
        const {id} = req.params

        const file = await File.query().findById(id)
        if(!file) throw new Error("File not found")
        if(file.user_id === req.user.id) {
            fs.unlink(`static/uploads/${file?.title}.${file?.extension}`, err => {
                if(err) {
                    throw new Error(`Error: ${err}`)
                }
            })
            await File.query().deleteById(id)
        }   else throw new Error("Don't have permissions")

        await res.json({
            success: true,
            message: 'Successfully deleted file'
        })


    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

export const getInfo = async (req: RequestWithUser, res: Response) => {
    try {
        if(!req.user) throw new Error("Not authorized")
        const {id} = req.params

        const file = await File.query().findById(id)
        if(!file) throw new Error("File not found")
        if(file.user_id !== req.user.id) throw new Error("Don't have permissions")

        await res.json({
            success: true,
            data: file
        })


    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}


export const download = async (req: RequestWithUser, res: Response) => {
    try {
        if(!req.user) throw new Error("Not authorized")
        const {id} = req.params

        const file = await File.query().findById(id)
        if(!file) throw new Error("File not found")
        if(file.user_id !== req.user.id) throw new Error("Don't have permissions")

        const filePath = `static/uploads/${file?.title}.${file?.extension}`
        fs.access(filePath, fs.constants.F_OK, err => {
            if(err) throw new Error('File not found')
        })

        fs.readFile(filePath, (err, content) => {
            if(err) throw new Error('File not found')
            res.writeHead(200, {"Content-type": file?.mime})
            res.end(content)
        })


    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

