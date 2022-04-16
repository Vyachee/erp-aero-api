import "module-alias/register";
import {connect} from "@/services/objection";
import express from 'express';
import routes from "@/routes";
import multer from "multer";
import cors from "cors";
require('dotenv').config();

connect()

const port = process.env.PORT
const app = express()

app.use(cors());
app.use(express.text({ type: 'text/*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes)

app.listen(port, async (err?: Error) => {
    if (err) {
        console.error(`Error : ${err}`);
        process.exit(-1);
    }   else {
        console.log('Success started')
        console.log(`http://localhost:${port}`)
    }
});
