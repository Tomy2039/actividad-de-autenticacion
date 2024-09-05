import { conexion } from '../db/database.js'
import bcrypt from 'bcrypt';


//login
export const login = async (req, res) => {
    const { username, password } = req.body;
    let conections
    try {
        conections = await conexion()
        const [rows] = await conections.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            req.session.userId = user.id;
            req.session.username = user.username;
            return res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username } });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}
/*app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Buscar usuario
    const user = database.user.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardar información del usuario en la sesión
        req.session.userId = user.id;
        req.session.username = user.username;

        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user: { id: user.id, username: user.username } });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});*/

//register
export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    let conections
    try {
        conections = await conexion()
        
        // Verificar si el usuario ya existe
        const [userExist] = await conections.query('SELECT * FROM users WHERE username = ?', [username]);
        if (userExist.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        // Encriptar password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const [rows] = await conections.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        if (rows.affectedRows === 1) {
            return res.json({ message: 'Usuario registrado exitosamente' });
        } else {
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}


//logout
export const logout = async (req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
}
/*app.post('/logout', (req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
});*/



//session
export const session = async (req, res) => {
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
}
/*app.get('/session', (req, res) => {
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
});*/
