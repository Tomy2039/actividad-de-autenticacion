import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import "dotenv/config.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { conexion } from './db/database.js';
import { ruta } from './routes/auth.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

conexion();

//middlewares
app.use(morgan('dev'))
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3001'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}));
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

//Ruta para servir la carpeta frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

//Ruta para servir el index.html de la carpeta frontend
app.get('/session', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
})

app.use(ruta);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));


