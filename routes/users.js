import { Router } from "express";
import { body, param } from 'express-validator';

import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from "../controllers/users.js";
import { validateFields } from "../middlewares/fields-validator.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isValidEmail, isValidRole, userByIdExists  } from "../helpers/db-validators.js";

export const router = Router();

//GET API Route
router.get( '/', usersGet );

//POST API Route
router.post( '/', [
    body( 'name', 'The name is required' ).not().isEmpty(),
    body( 'email', 'The email is not valid' ).isEmail(),
    body( 'email' ).custom( isValidEmail ),
    body( 'password', 'The password should be at least 6 characters long').isLength({ min: 6 }),
    body( 'role' ).custom( isValidRole ),
    validateFields
], usersPost );

//PUT API Route
router.put( '/:id', [
    param( 'id' ).custom( userByIdExists ),
    body( 'role' ).custom( isValidRole ),
    validateFields
], usersPut );

//DELETE API Route
router.delete( '/:id', [
    validateJWT,
    param( 'id' ).custom( userByIdExists ),
    validateFields
], usersDelete );

//DELETE 2 API Route
router.patch( '/', usersPatch );