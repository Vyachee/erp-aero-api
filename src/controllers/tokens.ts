import {Request, Response} from "express";
import User from "@/models/User";
import {tools} from "@/utils/tools";
import Token from "@/models/Token";
import { addSeconds } from "date-fns";
require('dotenv').config();


export const new_token = async (req: Request, res: Response) => {
    try {
        const {refresh_token} = req.body;
        console.log(refresh_token)

        const token = await Token.query().findOne({refresh_token})
        if(!token) throw new Error('Invalid token')

        const valid_until = addSeconds(token?.granted_date, Number(process.env.REFRESH_TOKEN_LIFETIME)).getTime()
        if(valid_until < new Date().getTime()) {
            await Token.query().deleteById(token?.id)
            throw new Error("Expired token")
        }

        const [new_access, new_refresh] = [tools.getRandomString(), tools.getRandomString()]
        const newTokens = await Token.query().updateAndFetchById(token?.id, {
            access_token: new_access,
            refresh_token: new_refresh,
            granted_date: new Date()
        })

        await res.json({
            access_token: new_access,
            refresh_token: new_refresh,
            valid_until: addSeconds(new Date(newTokens?.granted_date), Number(process.env.ACCESS_TOKEN_LIFETIME))
        })

    }   catch (e: any) {
        await res.json({
            success: false,
            message: e?.message || e,
        }).status(500)
    }
}

