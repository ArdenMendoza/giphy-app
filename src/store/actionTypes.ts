import { Action } from 'redux';

export interface ISimpleAction extends Action { type: string; }
export interface IAction<P> extends ISimpleAction { payload: P; }