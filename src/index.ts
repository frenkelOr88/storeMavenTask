import {ServiceManager} from "./service/manager";

(async function main(): Promise<void> {
    try {
        // @ts-ignore
        console.info(`Starting application...`);
        await ServiceManager.collectDataInit();
    } catch (err) {
        // @ts-ignore
        console.error(`Fail to start application! with error: ${err}`);
        throw err;
    } finally {
        // close sql connection?
    }
})();
