import mongoose from 'mongoose';
import Role from '../models/role.js';
import User from '../models/user.js';

//Verify if the role sent by the user is a valid value compared to the DB
export const isValidRole = async( role = '') => {
    const roleExists = await Role.findOne({ role });
    if( !roleExists ){
        throw new Error(`The role ${role} does not exist in the database`);
    }
}

//Verify if the email exists and if its valid
export const isValidEmail = async( email = '' ) => {
    const emailExists = await User.findOne({ email });
    if( emailExists ){
        throw new Error(`The email: ${email} is already registered`);
    }
}

//Checks if an user exists by the id
export const userByIdExists = async( id ) => {

    if( mongoose.Types.ObjectId.isValid( id ) ){
        const userExists = await User.findById( id );

        if( !userExists ){
            throw new Error(`The id ${id} does not exist in the database`);
        }
    }else{
        throw new Error(`The id ${id} is not valid`);
    }

}