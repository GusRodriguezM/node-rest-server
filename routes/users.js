import { Router } from "express";
import { body } from 'express-validator';

import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from "../controllers/users.js";
import { validateFields } from "../middlewares/fields-validator.js";
import { isValidEmail, isValidRole } from "../helpers/db-validators.js";

export const router = Router();

//GET request
router.get( '/', usersGet );

//POST API Route
router.post( '/', [
    body( 'name', 'The name is required' ).not().isEmpty(),
    body( 'email', 'The email is not valid' ).isEmail(),
    body( 'email', 'The email is not valid' ).custom( isValidEmail ),
    body( 'password', 'The password should be at least 6 characters long').isLength({ min: 6 }),
    body( 'role' ).custom( isValidRole ),
    validateFields
], usersPost );

//PUT request
router.put( '/:id', usersPut );

//DELETE request
router.delete( '/', usersDelete );

//DELETE request
router.patch( '/', usersPatch );