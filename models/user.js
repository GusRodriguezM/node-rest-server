import { model, Schema } from "mongoose";

const UserScheme = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean, 
        default: false
    }
});

UserScheme.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

export default model( 'User', UserScheme );