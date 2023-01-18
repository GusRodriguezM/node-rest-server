import { Router } from "express";
import { validateFields } from "../middlewares/fields-validator.js";

export const categoriesRouter = Router();

//Get all the categories - public
categoriesRouter.get( '/', (req, res) => {
    res.json('GET');
} );

//Get a category by id - public
categoriesRouter.get( '/:id', (req, res) => {
    res.json('GET by id');
} );

//Create a category - private with any role
categoriesRouter.post( '/', (req, res) => {
    res.json('POST');
} );

//Update a category by id - private anyone with a valid token
categoriesRouter.put( '/:id', (req, res) => {
    res.json('PUT');
} );

//Delete a category by id - private, only the users with the ADMIN role
categoriesRouter.delete( '/:id', (req, res) => {
    res.json('DELETE');
} );