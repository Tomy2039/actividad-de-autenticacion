import mysql from 'mysql2/promise';

export const conexion = async () => {
    try {
        const conection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_system'
        })
        console.log("Conectado a la base de datos");
        return conection;
    } catch (error) {
        console.error("Error a al conectar la base de datos ")
        process.exit(1);
    }
}