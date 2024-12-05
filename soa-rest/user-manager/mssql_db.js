import sql from 'mssql';

const config = {
    user: 'codetn_',
    password: '1598753258',
    server: 'sql.bsite.net',
    database: 'codetn_',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        instanceName: 'MSSQL2016',
    }
};

export async function get_Users() {
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM users');
        return result.recordset;
    } catch (err) {
        throw err;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function get_User(email) {
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');
        return result.recordset[0];
    } catch (err) {
        throw err;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function delete_User(email) {
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('DELETE FROM users WHERE email = @email');
        return result.rowsAffected[0];
    } catch (err) {
        throw err;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}
export async function insertRow(table, data) {
    try {
      const request = new sql.Request();
      let query = `INSERT INTO ${table} (${Object.keys(data).join(', ')}) 
                   VALUES (${Object.values(data).map(val => `'${val}'`).join(', ')})`;

      const result = await request.query(query);
      console.log('Row inserted:', result);
      return result;
    } catch (err) {
      console.error('Error inserting row:', err.message);
      throw err;
    }
  }

(async () => {
  try {
      const users = await get_Users();
      console.log(users);
      
      const user = await get_User('john.doe@example.com');
      console.log(user);

      const deletedCount = await delete_User('john.doe@example.com');
      console.log(`Deleted ${deletedCount} user(s)`);
  } catch (err) {
      console.error(err.message);
  }
})();