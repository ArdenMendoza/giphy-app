
import { gif } from '../api/model';
import * as gifActions from './actions';
export interface IGifsState {
    trendingGifs: gif[];
}

const initialState: IGifsState = {
    trendingGifs: []
}

export const gifsReducer = (
    state = initialState,
    action: gifActions.ILoadTrendingGifsAction
): IGifsState => {
    switch (action.type) {
        case 'LOAD_TRENDING_GIFS':
            return {
                ...state, 
                trendingGifs: action.payload
            }
    }
    return state;
}