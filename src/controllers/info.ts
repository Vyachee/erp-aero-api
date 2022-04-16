import {Request, Response} from "express";
import User from "@/models/User";
import {tools} from "@/utils/tools";
import Token from "@/models/Token";
import { addSeconds } from "date-fns";
import { RequestWithUser } from "@/types";
require('dotenv').config();


export const getInfo = async (req: RequestWithUser, res: Response) => {
    try {
        await res.json({
            success: true,
            id: req.user?.id
        })
    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

