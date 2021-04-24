import { IGifsState, initialState } from "../store/reducer";
import { IGifItem } from "./model";

export const gifViewMapper = (data: any): IGifsState => {
    const gifViewData: IGifsState = {
        trendingGifs: [],
        pagination: initialState.pagination
    };
    data.data.forEach((d: any) => {
        gifViewData.trendingGifs.push({
            title: d.title,
            id: d.id,
            type: d.type,
            url: d.url,
            username: d.username,
            rating: d.rating,
            user: {
                avatar_url: d.user?.avatar_url,
                profile_url: d.user?.profile_url
            }
        });
    })
    gifViewData.pagination = {
        total_count: data.pagination.total_count,
        count: data.pagination.count,
        offset: data.pagination.offset
    }
    return gifViewData;
}