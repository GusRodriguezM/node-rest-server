import path from 'path';
import { fileURLToPath } from 'url';
import { request, response } from "express";

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export const uploadFiles = ( req = request, res = response) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).json({
            msg: 'There is no files in the request'
        });
        return;
    }

    const { file } = req.files;

    const uploadPath = path.join( __dirname, '../uploads/', file.name);

    file.mv( uploadPath, (err) => {
    
        if ( err ) {
            return res.status(500).json({ err });
        }

        res.json( { msg: 'File uploaded to ' + uploadPath } );

    });
}