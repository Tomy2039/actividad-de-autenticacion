import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import "dotenv/config.js";
import { conexion } from './db/database.js';
import { ruta } from './routes/auth.routes.js';

const app = express();

conexion();

//middlewares
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:5500',
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

app.use(ruta);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));


// Middlewares 
/*
app.use(cors({ // Permitir solicitudes desde el front-end
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Habilitar envío de cookies
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // true solo si usas HTTPS
        httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
        // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    }
}));
*/
