import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
'host': process.env.MYSQL_HOST,
'user' : process.env.MYSQL_USER,
'password' :process.env.MYSQL_PASS,
'database' : process.env.MYSQL_DATABASE
}).promise()

    export async function get_Users(){
        //await pool.query("INSERT INTO USR VALUES ('p@pi.tn','98227788','Med','Blaiech','19/05/1995','near you','hashed pass')")
        const res = await pool.query("SELECT * FROM usr");
        return res[0];
    }
    export async function get_User(email){
        const res = await pool.query("SELECT * FROM usr WHERE email = (?)", email);
        return res[0][0];
        }
    export async function delete_User(email){
        const res = await pool.query(`DELETE FROM usr WHERE email = (?)`,  email);
        return res;
        }
    export async function insert_User(user){
        const res = await pool.query(`INSERT INTO usr (${Object.keys(user)}) VALUES (?)`,  [Object.values(user)]);
        return res[0];
        }