import { request, response } from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async( req = request, res = response) => {

    const { email, password } = req.body;

    try {
        
        //Check if the email exists
        const user = await User.findOne( { email } );

        if( !user ){
            return res.status(400).json({
                msg: 'Email / Password are incorrect - email'
            });
        }

        //Check if the user is active
        if( !user.status ){
            return res.status(400).json({
                msg: 'Email / Password are incorrect - status: false'
            });
        }

        //Check the password
        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Email / Password are incorrect - password'
            });
        }


        //Generate a JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });


    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong!'
        });

    }

}