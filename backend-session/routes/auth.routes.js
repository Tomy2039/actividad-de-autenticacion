import { Router } from 'express';

const ruta = Router();

import {
    login,
    logout,
    register
} from '../controllers/auth.controllers.js'

ruta.get('/session',);
ruta.post('/login', login);
ruta.post('/register', register);
ruta.post('/logout', logout);