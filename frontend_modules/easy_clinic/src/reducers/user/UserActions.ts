import {
    ChangeUserTypes,
    USER_SET_EMAIL,
    USER_SET_ID,
    USER_SET_JWT,
    USER_SET_SELECTED_USER_ID, USER_SET_SELECTED_USER_TYPE,
    USER_SET_USER_TYPE,
    UserType
} from "../Types";

export function setUserId(id: string): ChangeUserTypes {
    return {
        type: USER_SET_ID,
        id: id
    }
}

export function setUserEmail(email: string): ChangeUserTypes {
    return {
        type: USER_SET_EMAIL,
        email: email
    }
}

export function setUserType(userType: UserType): ChangeUserTypes {
    return {
        type: USER_SET_USER_TYPE,
        userType
    }
}

export function setUserJwt(jwt: string) {
    return {
        type: USER_SET_JWT,
        jwt
    }
}

export function setSelectedUserId(selectedUserId: string) {
    return {
        type: USER_SET_SELECTED_USER_ID,
        selectedUserId
    }
}

export function setSelectedUserType(selectedUserType: UserType) {
    return {
        type: USER_SET_SELECTED_USER_TYPE,
        selectedUserType
    }
}