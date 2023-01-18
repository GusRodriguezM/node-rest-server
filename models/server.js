import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config.js';
import { authRouter } from '../routes/auth.js';
import { categoriesRouter } from '../routes/categories.js';
import { router } from '../routes/users.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            authPath: '/api/auth',
            categoriesPath: '/api/categories',
            usersPath: '/api/users'
        }

        //Connection to th DB
        this.connectionToDB();

        //Middlewares
        this.middlewares();

        //App routes
        this.routes();
    }

    async connectionToDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Reading and parsing the body
        this.app.use( express.json() );

        //Public folder
        this.app.use( express.static('public') );
    }

    //App routes
    routes() {
        this.app.use( this.paths.authPath, authRouter );
        this.app.use( this.paths.categoriesPath, categoriesRouter );
        this.app.use( this.paths.usersPath, router );
    }

    //Port where the app will run
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port, ${this.port}`);
        });
    }

}

export default Server;