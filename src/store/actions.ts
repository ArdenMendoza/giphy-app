import { IAction, ISimpleAction } from './actionTypes';
import { IGifItem } from '../api/model';
import { IGifsState } from './reducer';

export interface IFetchTrendingGifsAction extends ISimpleAction { type: 'FETCH_TRENDING_GIFS'; }
export const fetchTrendingGifs = (): IFetchTrendingGifsAction => ({
    type: 'FETCH_TRENDING_GIFS'
});

export interface ILoadTrendingGifsAction extends IAction<IGifsState> { type: 'LOAD_TRENDING_GIFS'; }
export const loadTrendingGifs = (payload: IGifsState): ILoadTrendingGifsAction => ({
    type: 'LOAD_TRENDING_GIFS',
    payload
});