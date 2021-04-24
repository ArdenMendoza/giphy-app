
import { IGifItem, IPagination } from '../api/model';
import * as gifActions from './actions';
export interface IGifsState {
    trendingGifs: IGifItem[];
    pagination: IPagination;
}

export const initialState: IGifsState = {
    trendingGifs: [],
    pagination: {
        total_count: 0,
        count: 0,
        offset: 0
    }
}

export const gifsReducer = (
    state = initialState,
    action: gifActions.ILoadTrendingGifsAction
): IGifsState => {
    switch (action.type) {
        case 'LOAD_TRENDING_GIFS':
            return {
                ...state,
                trendingGifs: action.payload.trendingGifs,
                pagination: action.payload.pagination
            }
    }
    return state;
}