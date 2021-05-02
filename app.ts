import dotenv from 'dotenv';
import Server from './models/server';

// Configuración de dot.env
dotenv.config();

const server = new Server();

server.listen();