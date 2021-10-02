import {EarthquakeDataManager} from "./earthquakeData";
import {ElevationDataManager} from "./elevationData";


export class ServiceManager {
    private static earthquakeDataManager: EarthquakeDataManager = new EarthquakeDataManager();
    private static elevationDataManager: ElevationDataManager = new ElevationDataManager();

    public static async collectDataInit() {
        await this.collectData();
    }

    private static async collectData() {
        try {
            console.info('Start to collect data');
            const maxDateToCollect = new Date().getTime();
            const newEarthquakeData = await this.earthquakeDataManager.getAllNewEarthquakesData(maxDateToCollect);
            const enrichedEarthquakeData = await this.elevationDataManager.enrichEarthquakesData(newEarthquakeData);
            await this.earthquakeDataManager.saveEarthquakeToDb(enrichedEarthquakeData);
            await this.earthquakeDataManager.updateNewDateOfData(maxDateToCollect);
            console.info('Finish to collect data');
        } catch (err) {
            console.error('Failed to update all earthquake data, will try again in next execution!! ');
        }
    }
}
