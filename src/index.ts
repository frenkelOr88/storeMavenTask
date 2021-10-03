import {ServiceManager} from "./service/manager";

(async function main(): Promise<void> {
    try {
        console.info(`Starting application...`);
        await ServiceManager.collectDataInit();
    } catch (err) {
        console.error(`Fail to start application! with error: ${err}`);
        throw err;
    }
})();
