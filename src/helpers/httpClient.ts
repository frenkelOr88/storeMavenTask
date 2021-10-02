import got, {Got, Response} from 'got';
import env from '../helpers/env';


export default class HttpClient {
    private client: Got;

    constructor(baseUrl: string, throwErrors?: boolean) {
        this.client = got.extend({
            prefixUrl: baseUrl,
            responseType: 'json',
            throwHttpErrors: throwErrors || true,
            timeout: env.HTTP_TIMEOUT,
        });
    }


    public async get(
        url: string,
        searchParams: any,
    ): Promise<Response> {
        const request = {
            url,
            searchParams,
        };

        try {
            const response: Response = await this.client.get(request);
            return response;
        } catch (error) {
            console.error({error},);
            throw error;
        }
    }
}
