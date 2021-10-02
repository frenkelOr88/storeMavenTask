import path from 'path';
import DBMigrate from 'db-migrate';
import env from '../../helpers/env';


performMigration().then(() => {
    console.log({msg: 'done performing migrations successfully'});
});

async function performMigration() {
    const migrationsDir = path.resolve(__dirname, 'migrations');
    const opts = {
        config: {
            dev: {
                driver: 'mysql',
                multipleStatements: true,
                host: env.DB_HOST,
                user: env.DB_USERNAME,
                password: env.DB_PASSWORD,
                database: env.DB_NAME,
            },
        },
        cmdOptions: {
            'migrations-dir': migrationsDir,
        },
        env: 'dev',
    };
    const dbmigrate = DBMigrate.getInstance(true, opts);
    return dbmigrate.up();
}

export = {performMigration};
