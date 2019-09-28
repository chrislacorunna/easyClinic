import {AppMode, CHANGE_APP_MODE, ChangeAppModeTypes} from "./Types";

export interface AppState {
    appMode: AppMode;
}
const initialAppState: AppState = ({
    appMode: AppMode.DEFAULT
})

export const appReducer = (
    state = initialAppState,
    action: ChangeAppModeTypes
) : AppState => {
    switch (action.type) {
        case CHANGE_APP_MODE:
            return {
                ...state,
                appMode: action.appMode
            };
        default:
            return state
    }
}