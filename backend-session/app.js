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


