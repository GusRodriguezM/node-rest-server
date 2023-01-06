import { Router } from "express";
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from "../controllers/users.js";

export const router = Router();

//GET request
router.get( '/', usersGet );

//POST request
router.post( '/', usersPost );

//PUT request
router.put( '/', usersPut );

//DELETE request
router.delete( '/', usersDelete );

//DELETE request
router.patch( '/', usersPatch );