import express, { Application } from 'express';
// userRoutes es el alias de la importacion por defecto de las rutas de usuario
import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../db/connection';

class Server {

    // Declarar las variables y especificar el tipo
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            
            await db.authenticate();
            console.log('Base de datos conectada');

        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }

    listen() {

        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto ' + this.port );
        })

    }

}

export default Server;