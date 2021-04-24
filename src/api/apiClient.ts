import axios, { AxiosInstance } from 'axios';
import { gifViewMapper } from './mappers';

export class GiphyClient {
    // private apiKey = 'SxR6omVAvIBVQ4brWPZQ1zrL3iwBE6Tg'; // API
    private apiKey = 'xhHpMQTYRUuNqCOAWLShq5wMSU91aJkF'; // SDK

    public getTrendingGifs = async (sizePerPage: number, offset: number) => {
        const service = axios.create();
        return service.get(`https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=${sizePerPage}&offset=${offset}&rating=g`)
            .then(res => ({ isSuccessful: true, message: 'success', data: gifViewMapper(res.data) }))
            .catch(error => ({ isSuccessful: false, message: error, data: undefined }))
    }
}