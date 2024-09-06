import { conexion } from '../db/database.js'
import bcrypt from 'bcryptjs'


//login
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('username:', username, 'password:', password);
    
    let conections;
    try {
        conections = await conexion();
        const [rows] = await conections.query('SELECT * FROM users WHERE username = ?', [username]);
        

        // Verifica si se encontró el usuario
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0]; // Asigna el usuario encontrado

        // Verifica si la contraseña es válida
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Guarda información del usuario en la sesión
        req.session.user = { id: user.id, username: user.username };
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    } finally {
        if (conections) {
            conections.end();  // Cierra la conexión a la base de datos
        }
    }
};


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




//session
export const session = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: 'Sesion activada', user: req.session.user });
    } else {
        res.status(401).json({ message: 'No hay sesión activa' });
    }
};
