import { Router } from 'express';

export const ruta = Router();

import {
    login,
    logout,
    register,
    session
} from '../controllers/auth.controllers.js'

ruta.get('/session', session);
ruta.post('/login', login);
ruta.post('/register', register);
ruta.post('/logout', logout);