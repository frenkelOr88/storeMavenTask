import newSql from './dbClient';
import Earthquake from "../entites/Earthquake";

const DUPLICATE_ERROR_NUMBER = 1062;
const LAST_UPDATE_ID_NAME = 'lastUpdate';

export default class EarthquakeDao {
    sqlClient: any;

    constructor() {
        this.sqlClient = newSql;
    }

    async save(earthquake: Earthquake) {
        if (earthquake) {
            const earthquakesToInsert = earthquake.toDB();
            try {
                const res = await this.sqlClient.executeQuery(
                    `INSERT INTO earthquake SET ?`,
                    earthquakesToInsert
                );
            } catch (err) {
                if (err.errno === DUPLICATE_ERROR_NUMBER) {
                    console.warn('Duplicate entry to sql will continue ');
                    return;
                }
                throw err;
            }
        }
    }

    async saveLastUpdateData(lastUpdate: number) {
        await this.sqlClient.executeQuery(
            `UPDATE lastUpdateData SET value=? WHERE id='${LAST_UPDATE_ID_NAME}'`,
            lastUpdate
        );
    }

    async getLastUpdateDate() {
        const res = await this.sqlClient.executeQuery(
            `SELECT * FROM lastUpdateData WHERE id='${LAST_UPDATE_ID_NAME}'`,
            []
        );
        return res[0]['value'];
    }
}
