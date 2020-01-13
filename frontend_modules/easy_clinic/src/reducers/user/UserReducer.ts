import {
    ChangeUserTypes,
    USER_SET_EMAIL,
    USER_SET_ID,
    USER_SET_JWT,
    USER_SET_SELECTED_USER_ID,
    USER_SET_SELECTED_USER_TYPE,
    USER_SET_USER_TYPE,
    UserType
} from "../Types";

export interface UserState {
    id: string;
    email: string;
    userType: UserType;
    jwt: string;
    selectedUserId: string;
    selectedUserType: UserType;
}
export const initialUserState: UserState = ({
    id: '',
    email: '',
    userType: UserType.DEFAULT,
    jwt: '',
    selectedUserType: UserType.DEFAULT,
    selectedUserId: ''

});

export const userReducer = (
    state = initialUserState,
    action: ChangeUserTypes
) : UserState => {
    switch (action.type) {
        case USER_SET_ID:
            return {
                ...state,
                id: action.id
            };
        case USER_SET_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case USER_SET_USER_TYPE:
            return {
                ...state,
                userType: action.userType
            };
        case USER_SET_JWT:
            return {
                ...state,
                jwt: action.jwt
            };
        case USER_SET_SELECTED_USER_TYPE:
            return {
                ...state,
                selectedUserType: action.selectedUserType
            };
        case USER_SET_SELECTED_USER_ID:
            return {
                ...state,
                selectedUserId: action.selectedUserId
            };
        default:
            return state
    }
};