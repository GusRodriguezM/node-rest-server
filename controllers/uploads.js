import { request, response } from "express";
import { uploadFile } from "../helpers/index.js";

//Controller to upload files to the server
export const uploadFiles = async( req = request, res = response) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).json({
            msg: 'There is no files in the request'
        });
        return;
    }

    /**
     * Function to upload files. Receives three args
     * 1. The files from the request
     * 2. The specified extensions, if empty or undefined the function will accept only images
     * 3. The folder name to upload the files
     */

    try {
        //Example using different arguments
        // const fileName = await uploadFile( req.files, ['txt', 'md'], 'texts' );
        //Accepting only images
        const fileName = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ fileName });
    } catch ( error ) {
        res.status(400).json({ msg: error });
    }
    
}