import express from 'express';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //App routes
        this.routes();
    }

    middlewares() {
        //Public folder
        this.app.use( express.static('public') );
    }

    //App routes
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
    }

    //Port where the app will run
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port, ${this.port}`);
        });
    }

}

export default Server;