import { Router } from "express";
import { body, param } from 'express-validator';

import { validateFields, validateJWT, isAdminRole, hasRole } from '../middlewares/index.js';

import { isValidEmail, isValidRole, userByIdExists  } from "../helpers/db-validators.js";

export const productsRouter = Router();

productsRouter.get( '/', (req, res) => {
    res.json('Get');
} );

productsRouter.get( '/:id', (req, res) => {
    res.json('Get - id');
} );

productsRouter.post( '/',  (req, res) => {
    res.json('Post');
} );


productsRouter.put( '/:id',  (req, res) => {
    res.json('Put');
} );


productsRouter.delete( '/:id',  (req, res) => {
    res.json('Delete');
} );