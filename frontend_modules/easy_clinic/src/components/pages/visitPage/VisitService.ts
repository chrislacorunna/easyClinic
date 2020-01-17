import {UserDetails} from "../userPage/userOverview/UserOverview";
import $ from "jquery";
import {VisitInterface} from "./create/VisitCreatePage";
import {DELETE_USER_URL} from "../userPage/UserService";

export const VISIT_URL = "http://localhost:8082/visit";
export const SAVE_VISIT_URL = VISIT_URL + "/save";
export const GET_VISITS_URL = VISIT_URL + "/get";
export const GET_VISIT_DETAILS_URL = VISIT_URL + "/details";

export const saveVisit = (data: VisitInterface) => {
    return $.ajax({
        url: SAVE_VISIT_URL,
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

export const getVisits = (id: string) => {
    return $.ajax({
        url: GET_VISITS_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

export const getVisitDetails = (id: string) => {
    return $.ajax({
        url: GET_VISIT_DETAILS_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};