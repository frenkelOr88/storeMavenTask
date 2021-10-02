import { Response } from 'got';
import env from '../helpers/env';
import HttpClient from '../helpers/httpClient';
const URL = 'elevation/v1/ele/';

export class ElevationAPIService {
  private client: HttpClient = new HttpClient(
      env.ELEVATION_SERVICE_URL,
      true
  );

  public async getElevationData(
      latitude: string,
      longitude: string,
  ): Promise<Response<{ data: Array<any> }>> {
    const searchParams = {
      'points': `${latitude},${longitude}`,
    };
    const res: Response = await this.client.get(URL, searchParams);
    return res as Response<{ data: Array<any> }>;
  }
}

