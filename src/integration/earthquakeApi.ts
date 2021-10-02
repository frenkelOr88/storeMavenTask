import {Response} from 'got';
import env from '../helpers/env';
import HttpClient from '../helpers/httpClient';

const URL = 'fdsnws/event/1/query';

export class EarthquakeAPIService {
    private client: HttpClient = new HttpClient(
        env.EARTHQUAKE_SERVICE_URL,
        true
    );

    public async getEarthquakeData(
        fromDate: number,
        toDate: number,
    ): Promise<Response<{ features: Array<any> }>> {
        const dateFrom = new Date(fromDate);
        const dateTo = new Date(toDate);
        const searchParams = {
            'format': 'geojson',
            'starttime': dateFrom.toISOString(),
            'endtime': dateTo.toISOString()
        };
        const res: Response = await this.client.get(URL, searchParams);
        return res as Response<{ features: Array<any> }>;
    }
}
