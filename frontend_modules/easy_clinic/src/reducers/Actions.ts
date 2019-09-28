import {AppMode, CHANGE_APP_MODE, ChangeAppModeTypes} from "./Types";

export function changeAppModeAction(appMode: AppMode): ChangeAppModeTypes {
    return {
        type: CHANGE_APP_MODE,
        appMode: appMode
    }
}