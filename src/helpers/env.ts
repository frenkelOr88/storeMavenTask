import {createEnvObject} from 'envboss';
import {Types} from "envboss/src";

const ENV_VAR_CONFIG = {
    HTTP_TIMEOUT: {default: 30000, type: Types.Number},
    DB_HOST: {default: 'localhost', type: Types.String},
    DB_USERNAME: {default: 'root', type: Types.String},
    DB_PASSWORD: {default: 'password', type: Types.String},
    DB_NAME: {default: 'earthquakes', type: Types.String},
    EARTHQUAKE_SERVICE_URL: {default: 'https://earthquake.usgs.gov', type: Types.String},
    ELEVATION_SERVICE_URL: {default: 'https://api.airmap.com', type: Types.String},
    MAX_PROMISE: {default: 30, type: Types.Number},
    CRON_EXECUTION: {default: '*/30 * * * *', type: Types.String},
};

interface Env {
    HTTP_TIMEOUT: number;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    EARTHQUAKE_SERVICE_URL: string;
    ELEVATION_SERVICE_URL: string;
    MAX_PROMISE: number;
    CRON_EXECUTION: string;

}

export default ((): Env => {
    return createEnvObject(ENV_VAR_CONFIG) as Env;
})();

