import express from 'express'
import { loginRules, registerRules, validateFieldRules } from "@/validator/user";
import { checkSchema } from "express-validator";
import validate from "@/middleware/validate";
import {login, register, validateUserField} from "@/controllers/users";
const router = express.Router();

router.post('/register', checkSchema(registerRules), validate, register)
router.post('/login', checkSchema(loginRules), validate, login)
router.post('/validateUserField', checkSchema(validateFieldRules), validate, validateUserField)

export default router
