import { request, response } from "express";
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

//GET request controller
export const usersGet = (req = request, res = response) => {

    const { q, name = 'no name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'GET request - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

//POST API controller
export const usersPost = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;

    //Creating an instance of User
    const user  = new User({ name, email, password, role });

    //Verify if the email exists and if its valid
    const emailExists = await User.findOne({ email });
    if( emailExists ){
        return res.status(400).json({
            msg: 'The email is already registered'
        });
    }

    //Encrypt the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    //Saving the user into the DB
    await user.save();

    res.json({
        msg: 'POST request - controller',
        user
    });
}

//PUT request controller
export const usersPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'PUT request - controller',
        id
    });
}

//DELETE request controller
export const usersDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE request - controller'
    });
}

//PATCH request controller
export const usersPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH request - controller'
    });
}