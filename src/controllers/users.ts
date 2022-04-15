import {Request, Response} from "express";
import User from "@/models/User";
import * as crypto from "crypto";
import Token from "@/models/Token";
const secret = "huyzhopagovno"


export const register = async (req: Request, res: Response) => {
    try {
        const {username, email, firstname, lastname, birthday, about, password} = req.body;

        const check = await User.query().findOne({email})
        if(check) throw new Error("Email already exists")

        const hashed = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        const user = await User.query().insertAndFetch({
            username, email, firstname, lastname, birthday, about,
            password: hashed
        })

        const token = await createToken(user)

        await res.json({
            success: true,
            token: token?.token
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
        const {email, password} = req.body;
        const user = await User.query().findOne({email})
        if(!user) throw new Error("User not found");


        const hashed = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        if(user.password !== hashed) throw new Error("Invalid email or password");

        const token = await createToken(user)

        await res.json({
            success: true,
            token: token?.token || false
        })

    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

const createToken = async (user: User) => {
    return Token.query().insertAndFetch({
        user_id: user.id,
        token: crypto.randomBytes(32).toString('hex')
    });
}

interface ValidationObject {
    [key: string]: any
}

export const validateUserField = async (req: Request, res: Response) => {
    try {
        const {field, value} = req.body
        let condition: ValidationObject = {}
        condition[field] = value

        const check = await User.query().where(condition)

        await res.json({
            success: true,
            hasValue: check.length > 0
        })
    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e
        })
    }
}
