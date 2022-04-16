import {Request, Response} from "express";
import User from "@/models/User";
import {tools} from "@/utils/tools";
import {addSeconds} from "date-fns";
require('dotenv').config();


export const register = async (req: Request, res: Response) => {
    try {
        const {id, password} = req.body;

        if(!id || !password) throw new Error("Invalid credentials")

        const check = await User.query().findById(id)
        if(check) throw new Error("Credential already exists")

        const hashed = tools.hashPassword(password)

        const user = await User.query().insertAndFetch({
            id,
            password: hashed
        })

        const token = await tools.createToken(user)

        await res.json({
            success: true,
            access_token: token?.access_token,
            refresh_token: token?.refresh_token,
            valid_until: addSeconds(token?.granted_date, Number(process.env.ACCESS_TOKEN_LIFETIME)),
        })

    }   catch (e: any) {
        console.log(e)
        await res.json({
            success: false,
            message: e?.message || e
        }).status(500)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {id, password} = req.body;
        const user = await User.query().findById(id)
        if(!user) throw new Error("User not found");

        const hashed = tools.hashPassword(password)
        if(user.password !== hashed) throw new Error("Invalid credentials");

        const token = await tools.createToken(user)
        await res.json({
            success: true,
            access_token: token?.access_token,
            refresh_token: token?.refresh_token,
        })

    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

