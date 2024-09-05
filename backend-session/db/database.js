import mysql from 'mysql2/promise';
import config from '../config.js';
export const conexion = async () => {
    try {
        const conection = await mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        })
        console.log("Conectado a la base de datos");
        return conection;
    } catch (error) {
        console.error("Error a al conectar la base de datos ")
        process.exit(1);
    }
}