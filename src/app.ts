import "module-alias/register";
import {connect} from "@/services/objection";
import express from 'express';
import routes from "@/routes";
require('dotenv').config();

connect()

const port = process.env.PORT
const app = express()

app.use(express.text({ type: 'text/*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes)

app.listen(port, async (err?: Error) => {
    if (err) {
        console.error(`Error : ${err}`);
        process.exit(-1);
    }   else {
        console.log('Success started')
    }
});
