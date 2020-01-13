import {UserType} from "../../../reducers/Types";
import $ from "jquery";
import {UserDetails} from "./userOverview/UserOverview";

export const SERVICE_URL = "http://localhost:8080/user";
export const GET_USERS_URL = SERVICE_URL + "/admin/users";
export const DELETE_USER_URL = SERVICE_URL + '/admin/delete';
export const ADMIN_GET_USER_URL = SERVICE_URL + '/admin/getuserdetails';
export const ADMIN_UPDATE_USER_URL = SERVICE_URL + '/admin/update';
export const ADMIN_CREATE_USER_URL = SERVICE_URL + '/admin/create';
export const ADMIN_ENABLE_USER_URL = SERVICE_URL + '/admin/disable';

export const getUsers = (userType: UserType) => {
    return $.ajax({
        url: GET_USERS_URL,
        method: "POST",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        dataType: 'json',
        data: JSON.stringify({
            groupName: userType
        })
    });
};

export const deleteUser = (id: string) => {
    return $.ajax({
        url: DELETE_USER_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

export const adminGetUser = (id: string) => {
    return $.ajax({
        url: ADMIN_GET_USER_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

export const updateUser = (data: UserDetails) => {
    return $.ajax({
        url: ADMIN_UPDATE_USER_URL,
        method: "POST",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        dataType: 'json',
        data: JSON.stringify(data)
    });
};

export const createUser = (data: UserDetails) => {
    return $.ajax({
        url: ADMIN_CREATE_USER_URL,
        method: "POST",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        dataType: 'json',
        data: JSON.stringify(data)
    });
};

export const enableUser = (id: string) => {
    return $.ajax({
        url: ADMIN_ENABLE_USER_URL,
        method: "POST",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        dataType: 'json',
        data: JSON.stringify({
            id: id,
            disable: false
        })
    });
};