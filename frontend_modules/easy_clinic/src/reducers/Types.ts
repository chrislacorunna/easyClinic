export const USER_SET_USER_TYPE = 'SET_USER_TYPE';
export const USER_SET_ID = 'SET_ID';
export const USER_SET_EMAIL = 'SET_EMAIL';
export const USER_SET_JWT = 'SET_JWT';
export const USER_SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID';
export const USER_SET_SELECTED_USER_TYPE = 'SET_SELECTED_USER_TYPE';


export enum UserType {
    DEFAULT = "DEFAULT",
    NO_GROUP = "NO_GROUP",
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    EMPLOYEE = "EMPLOYEE"
}

interface SetUserTypeAction {
    type: typeof USER_SET_USER_TYPE;
    userType: UserType;
}

interface SetUsernameAction {
    type: typeof USER_SET_ID;
    id: string;
}

interface SetEmailAction {
    type: typeof USER_SET_EMAIL;
    email: string;
}

interface SetJwtAction {
    type: typeof USER_SET_JWT;
    jwt: string;
}

interface SetSelectedUserId {
    type: typeof USER_SET_SELECTED_USER_ID;
    selectedUserId: string;
}

interface SetSelectedUserType {
    type: typeof USER_SET_SELECTED_USER_TYPE;
    selectedUserType: UserType;
}

export type ChangeUserTypes = SetUsernameAction | SetEmailAction | SetUserTypeAction | SetJwtAction
    | SetSelectedUserId | SetSelectedUserType;
