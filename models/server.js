import express from 'express';
import cors from 'cors';
import { router } from '../routes/users.js';
import { dbConnection } from '../database/config.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

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
        this.app.use( this.usersPath, router );
    }

    //Port where the app will run
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port, ${this.port}`);
        });
    }

}

export default Server;