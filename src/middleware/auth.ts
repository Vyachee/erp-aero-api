import {NextFunction, Response} from "express";
import Token from "@/models/Token";
import {RequestWithUser} from "@/types";

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
        if(user_token?.user) req.user = user_token.user
        await next()
    }   catch (e: any) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        }).end()
    }
}
