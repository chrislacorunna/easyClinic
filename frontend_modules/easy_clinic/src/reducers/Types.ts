export const CHANGE_APP_MODE = 'CHANGE_APP_MODE';

export enum AppMode {
    DEFAULT = "DEFAULT",
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

interface ChangeAppModeAction {
    type: typeof CHANGE_APP_MODE;
    appMode: AppMode;
}

export type ChangeAppModeTypes = ChangeAppModeAction;