import axios, { AxiosInstance } from 'axios';
import { gifMapper } from './mappers';

export class GiphyClient {
    private apiKey = 'SxR6omVAvIBVQ4brWPZQ1zrL3iwBE6Tg';

    public getTrendingGifs = async () => {
        const service = axios.create();
        return service.get(`https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=25&rating=g`)
            .then(res => ({ isSuccessful: true, message: 'success', data: gifMapper(res.data.data) }))
            .catch(error => ({ isSuccessful: false, message: error, data: undefined }))
    }
}