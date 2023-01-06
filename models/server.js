import express from 'express';
import cors from 'cors';

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
        //CORS
        this.app.use( cors() );

        //Public folder
        this.app.use( express.static('public') );
    }

    //App routes
    routes() {
        //GET request
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'GET request'
            });
        });

        //PUT request
        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'PUT request'
            });
        });

        //POST request
        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'POST request'
            });
        });

        //DELETE request
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'DELETE request'
            });
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