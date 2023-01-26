import { Router } from "express";
import { body, param } from 'express-validator';
import { updateImage, uploadFiles } from "../controllers/uploads.js";
import { allowedCollections } from "../helpers/index.js";
import { validateFields } from "../middlewares/index.js";

export const uploadFilesRouter = Router();

//GET API Route to upload a file
uploadFilesRouter.post( '/', uploadFiles );

//PUT API Route to change the image of the user
uploadFilesRouter.put('/:collection/:id', [
    param( 'id', 'The id is not valid' ).isMongoId(),
    //Using a callback to receive the collection and the list of allowed collections
    param( 'collection' ).custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
], updateImage );