import {combineReducers} from 'redux';
import {appReducer, AppState} from './AppReducer';

export interface StoreState {
    appReducer: AppState;
}

export const rootReducer = combineReducers({
    appReducer: appReducer
});