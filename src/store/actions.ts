import { IAction, ISimpleAction } from './actionTypes';
import { gif } from '../api/model';

export interface IFetchTrendingGifsAction extends ISimpleAction { type: 'FETCH_TRENDING_GIFS'; }
export const fetchTrendingGifs = (): IFetchTrendingGifsAction => ({
    type: 'FETCH_TRENDING_GIFS'
});

export interface ILoadTrendingGifsAction extends IAction<gif[]> { type: 'LOAD_TRENDING_GIFS'; }
export const loadTrendingGifs = (payload: gif[]): ILoadTrendingGifsAction => ({
    type: 'LOAD_TRENDING_GIFS',
    payload
});