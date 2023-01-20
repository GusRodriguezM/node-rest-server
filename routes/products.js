import { Router } from "express";
import { body, param } from 'express-validator';

import { validateFields, validateJWT, isAdminRole, hasRole } from '../middlewares/index.js';

import { existCategory, isValidEmail, isValidRole, userByIdExists  } from "../helpers/db-validators.js";
import { createProduct } from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get( '/', (req, res) => {
    res.json('Get');
} );

productsRouter.get( '/:id', (req, res) => {
    res.json('Get - id');
} );

//Creates a new product
/**
 * Only for users with a valid token, checks if the category exist in the DB
 */
productsRouter.post( '/', [
    validateJWT,
    body( 'name', 'The name of the product is required' ).not().isEmpty(),
    body( 'category' ).custom( existCategory ),
    validateFields
], createProduct );


productsRouter.put( '/:id',  (req, res) => {
    res.json('Put');
} );


productsRouter.delete( '/:id',  (req, res) => {
    res.json('Delete');
} );