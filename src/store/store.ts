import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { IGifsState, gifsReducer } from './reducer';

export interface IGiphyAppState {
    gifs: IGifsState;
}

const configureReducer = () =>
    combineReducers<IGiphyAppState>({
        gifs: gifsReducer
    });

export function configureStore() {
    const composeEnhancers =
        typeof window === 'object' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;
    const store = createStore(configureReducer(), composeEnhancers(applyMiddleware(thunk)));
    return store;
}

