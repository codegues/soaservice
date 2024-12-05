import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
'host': process.env.MYSQL_HOST,
'user' : process.env.MYSQL_USER,
'password' :process.env.MYSQL_PASS,
'database' : process.env.MYSQL_DATABASE
}).promise()

    export async function get_User(email){
        const res = await pool.query("SELECT * FROM usr WHERE email = (?)", email);
        return res[0][0];
    }
