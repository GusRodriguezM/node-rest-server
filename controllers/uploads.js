import { request, response } from "express";
import { uploadFile } from "../helpers/index.js";
import { Product, User } from "../models/index.js";

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

//Controller to update the image of the products or the users
export const updateImage = async( req = request, res = response ) => {

    const { id, collection } = req.params;

    let model;

    /**
     * Switch to control the option (collection)
     * First we search an user or a product by the id, if exists we save the result in a variable otherwise we return an error
     */
    switch ( collection ) {
        case 'users':
            model = await User.findById( id );
            if( !model ){
                return res.status(400).json({ msg: `Does not exist a user with the id ${id}` });
            }

            break;
        
        case 'products':
            model = await Product.findById( id );
            if( !model ){
                return res.status(400).json({ msg: `There is no a product with the id ${id}`});
            }
            break;
    
        default:
            res.status(500).json({ msg: 'Option not valid' });
            break;
    }

    //Uploading the image from the request in the folder specified by the name of the collection
    const fileName = await uploadFile( req.files, undefined, collection );

    //Saving the name of the image in te database
    model.image = fileName;

    await model.save();

    //Finally we return the updated model (user or product)
    res.json( model );

}