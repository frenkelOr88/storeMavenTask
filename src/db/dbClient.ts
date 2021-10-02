import env from '.././helpers/env';
import mysql from 'mysql2';

require('./mysqlConnectionAsync');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

function executeQuery(query, params): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query(query, params, function (error, results) {
            if (error) return reject(error);
            return resolve(results);
        });
    });
}

export = {executeQuery};
