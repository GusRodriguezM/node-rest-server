import { Router } from "express";
import { body } from 'express-validator';

import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from "../controllers/users.js";
import { validateFields } from "../middlewares/fields-validator.js";

export const router = Router();

//GET request
router.get( '/', usersGet );

//POST API Route
router.post( '/', [
    body( 'name', 'The name is required' ).not().isEmpty(),
    body( 'email', 'The email is not valid' ).isEmail(),
    body( 'password', 'The password should be at least 6 characters long').isLength({ min: 6 }),
    body( 'role', 'Is not a valid role' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
    validateFields
], usersPost );

//PUT request
router.put( '/:id', usersPut );

//DELETE request
router.delete( '/', usersDelete );

//DELETE request
router.patch( '/', usersPatch );