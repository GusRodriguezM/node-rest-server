import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
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

    //Splitting the file name into elemetens of an array
    const shortName = file.name.split('.');
    
    //Getting the extension of the file
    const extension = shortName[ shortName.length - 1 ];

    //Comparing the extension against an allowed list of extensions
    const validExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ];

    if( !validExtensions.includes( extension ) ){
        return res.status(400).json({
            msg: `The extension ${extension} is not allowed. The allowed extensions are ${validExtensions}`
        });
    }

    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', tempName );

    file.mv( uploadPath, (err) => {
    
        if ( err ) {
            return res.status(500).json({ err });
        }

        res.json( { msg: 'File uploaded to ' + uploadPath } );

    });
}