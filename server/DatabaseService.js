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
            database: envObj.DB_DATABASE,
            port: envObj.DB_PORT,
        }
    }

    connect(){
        this.connection = mysql.createConnection(this.databaseConfig);
        this.connection.connect(console.log);
    }

    async getAll(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM todos;"
                this.connection.query(query,(err, results) =>{
                    console.log(results)
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = new DatabaseService(process.env); // sington design pattern