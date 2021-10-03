import {ElevationAPIService} from "../integration/elevationApi";
import Earthquake from "../entites/Earthquake";

export class ElevationDataManager {
    private elevationAPIService: ElevationAPIService = new ElevationAPIService();

    public async enrichEarthquakesData(earthquakes: Array<Earthquake>): Promise<Array<Earthquake>> {
        //todo: can be that we will want to limit the concurrent promises
        const listOfPromises = earthquakes.map(earthquake => {
            return this.enrichEarthquakeData(earthquake);
        });
        await Promise.all(listOfPromises);
        return earthquakes;

    }

    private async enrichEarthquakeData(earthquake: Earthquake) {
        const elevationRes = await this.elevationAPIService.getElevationData(earthquake.latitude, earthquake.longitude);
        const elevation = elevationRes.body.data[0] || 'no elevation data';
        earthquake.elevation = elevation.toString();
    }


}
