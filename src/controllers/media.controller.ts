import fs from "fs"
import { Request, Response } from "express"
import path from "path"
import https from "https"


// @desc    Get media resource
// @route   GET /media/*
// @access  public
const HOST = 'https://dictionary.cambridge.org'
export const loadMedia = async (req: Request, res: Response) => {
    const file_name = path.join(__dirname, '..', '..', 'tmp', path.basename(req.originalUrl))

    const tmp_file = fs.createWriteStream(file_name);
    https.get(HOST + req.originalUrl, (response) => {
        response.pipe(tmp_file);

        tmp_file.on("finish", () => {
            tmp_file.close((err) => {
                if (err) return
                res.sendFile(file_name)
            });
        });
    });
}