import User from "@/models/User";
import Token from "@/models/Token";
import crypto from "crypto";
require('dotenv').config();
const secret = process.env.SECRET_KEY

const createToken = async (user: User) => {
    const [access_token, refresh_token] = [getRandomString(), getRandomString()]
    return Token.query().insertAndFetch({
        user_id: user.id,
        access_token,
        refresh_token,
        granted_date: new Date()
    });
}

const getRandomString = (): string => {
    return crypto.randomBytes(32).toString('hex');
}

const hashPassword = (password: string) => {
    if(typeof secret !== 'string') {
        return 'secret not assigned';
    }   else {
        return crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
    }
}

export const tools = {createToken, getRandomString, hashPassword}