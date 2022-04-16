import {NextFunction, Response} from "express";
import Token from "@/models/Token";
import {RequestWithUser} from "@/types";
import { addSeconds } from "date-fns";
require('dotenv').config();

const access_token_lifetime = process.env.ACCESS_TOKEN_LIFETIME

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]
        if(!token) throw new Error('No token')

        let access_token
        if (token.startsWith("Bearer ")){
            access_token = token.substring(7, token.length);
        } else {
            throw new Error('Invalid token')
        }

        const user_token = await Token.query()
            .findOne({access_token})
            .withGraphFetched('[user]')

        if(!user_token) throw new Error('Bad token')

        const _granted_date = user_token?.granted_date;
        const valid_until = addSeconds(_granted_date, Number(access_token_lifetime));
        if(valid_until.getTime() < Date.now()) {
            throw new Error('Expired token')
        }


        if(user_token?.user) req.user = user_token.user
        await next()
    }   catch (e: any) {
        res.status(401).json({
            success: false,
            status: "Unauthorized",
            message: e?.message || e
        }).end()
    }
}
