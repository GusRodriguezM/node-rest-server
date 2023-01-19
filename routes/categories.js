import { Router } from "express";
import { body, param } from "express-validator";
import { createCategory, getCategories, getCategoryById } from "../controllers/categories.js";
import { existCategory } from "../helpers/db-validators.js";
import { validateFields, validateJWT } from "../middlewares/index.js";

export const categoriesRouter = Router();

//Get all the categories - public
categoriesRouter.get( '/', getCategories );

//Get a category by id - public
categoriesRouter.get( '/:id', [
    param( 'id' ).custom( existCategory ),
    validateFields
], getCategoryById );

//Create a category - private with any role
categoriesRouter.post( '/', [
    validateJWT,
    body( 'name', 'The name of the category is required' ).not().isEmpty(),
    validateFields
], createCategory );

//Update a category by id - private anyone with a valid token
categoriesRouter.put( '/:id', (req, res) => {
    res.json('PUT');
} );

//Delete a category by id - private, only the users with the ADMIN role
categoriesRouter.delete( '/:id', (req, res) => {
    res.json('DELETE');
} );