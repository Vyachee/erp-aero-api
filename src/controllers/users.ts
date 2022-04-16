import {Request, Response} from "express";
import User from "@/models/User";
import {tools} from "@/utils/tools";
import {addSeconds} from "date-fns";
import { RequestWithUser } from "@/types";
import Token from "@/models/Token";
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


export const logout = async (req: RequestWithUser, res: Response) => {
    try {
        const token = `${req.headers.authorization}`
        if (!token.startsWith("Bearer ")) throw new Error('Invalid token')

        const access_token = token.substring(7, token.length);
        const _token = await Token.query().findOne({access_token})
        if(!_token) throw new Error('Token not found')

        await Token.query().deleteById(_token?.id)
        await res.json({
            success: true,
            message: 'Success logout'
        })

    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

