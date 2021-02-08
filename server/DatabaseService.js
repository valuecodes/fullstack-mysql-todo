const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();

class DatabaseService {
    databaseConfig = {};
    connection = null;

    constructor(envObj) {
        this.databaseConfig = {
            host: envObj.DB_HOST,
            user: envObj.DB_USER,
            password: envObj.DB_PASSWORD,
            database: envObj.DATABASE,
            port: envObj.DB_PORT,
        }
    }

    connect(){
        this.connection = mysql.createConnection(this.databaseConfig);
        this.connection.connect();
    }

    getAll(){}
}

module.exports = new DatabaseService(process.env); // sington design pattern