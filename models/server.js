const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../db/config');
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app = express();

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
            products: '/api/products',
            searchs: '/api/search',
            uploads: '/api/uploads',
            questions: '/api/questions',
        }

        //Connect to DB
        this.dbConnection()

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //JSON parse on body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));

        //File uploads
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.searchs, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.questions, require('../routes/questions'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running at port ${process.env.PORT}`);
        })
    }

    dbConnection() {
        dbConnect(process.env.MONGO_URI)
    }
}

module.exports = Server 
