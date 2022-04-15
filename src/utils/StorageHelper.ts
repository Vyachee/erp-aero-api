
import multer from "multer";
import {mkdirSync} from "fs";

export const getStorage = (path: string) => {
    return multer.diskStorage({
        destination: function (req, file: Express.Multer.File, cb) {
            mkdirSync(path, { recursive: true });
            cb(null, path);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    })
}

export const getFilter = (allowedMimetypes: String[]) => {
    return (req: any, file: Express.Multer.File, cb: any) => {
        console.log(file.mimetype)
        if(allowedMimetypes.includes(file.mimetype)) {
            cb(null, true);
        }   else {
            const error = `Only ${allowedMimetypes.join(', ')} type(s) allowed!`
            req.fileValidationError = error;
            return cb(null, false, new Error(error));
        }
    };
}
