import { Router } from "express";
import { body, param } from 'express-validator';

import { validateFields, validateJWT, isAdminRole, hasRole } from '../middlewares/index.js';

import { existCategory, existProduct, isValidEmail, isValidRole, userByIdExists  } from "../helpers/db-validators.js";
import { createProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";

export const productsRouter = Router();

//Get all products - route for any user
productsRouter.get( '/', getProducts );

//Gets a product by its id - route for any user
productsRouter.get( '/:id', [
    param( 'id' ).custom( existProduct ),
    validateFields
], getProductById );

/**
 * Creates a new product
 * Only for users with a valid token, checks if the category exist in the DB
 */
productsRouter.post( '/', [
    validateJWT,
    body( 'name', 'The name of the product is required' ).not().isEmpty(),
    body( 'category' ).custom( existCategory ),
    validateFields
], createProduct );

//Update a category by id - only for users with a valid token
productsRouter.put( '/:id', [
    validateJWT,
    param( 'id' ).custom( existProduct ),
    validateFields
], updateProduct );


productsRouter.delete( '/:id',  (req, res) => {
    res.json('Delete');
} );