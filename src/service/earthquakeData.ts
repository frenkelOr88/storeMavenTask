import Earthquake from "../entites/Earthquake";
import {EarthquakeAPIService} from "../integration/earthquakeApi";
import EarthquakeDao from "../db/earthquakeDao";


export class EarthquakeDataManager {
    private earthquakeAPIService: EarthquakeAPIService = new EarthquakeAPIService();
    private earthquakeDao: EarthquakeDao = new EarthquakeDao();


    public async getAllNewEarthquakesData(maxDateToCollect: number): Promise<Array<Earthquake>> {
        const lastUpdateDate = await this.getLastUpdatedDate();
        return this.getAllEarthquakesDataByDate(lastUpdateDate, maxDateToCollect);
    }

    public async getAllEarthquakesDataByDate(fromDate: number, toDate: number): Promise<Array<Earthquake>> {
        const earthquakeDataRes = await this.earthquakeAPIService.getEarthquakeData(fromDate, toDate);
        const earthquakeData = earthquakeDataRes.body.features.map(feature => Earthquake.fromHttpRes(feature.properties, feature.geometry, feature.id));
        return earthquakeData;
    }


    private async getLastUpdatedDate(): Promise<number> {
        const lastUpdate = await this.earthquakeDao.getLastUpdateDate();
        return Number.parseInt(lastUpdate);
    }

    public async updateNewDateOfData(dateToUpdate: number): Promise<void> {
        await this.earthquakeDao.saveLastUpdateData(dateToUpdate);
    }

    public async saveEarthquakeToDb(earthquakes: Array<Earthquake>): Promise<void> {
        const savePromiseList = earthquakes.map(earthquake => this.earthquakeDao.save(earthquake));
        await Promise.all(savePromiseList);
    }

}
