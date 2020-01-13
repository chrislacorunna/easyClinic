import {UserDetails} from "../userPage/userOverview/UserOverview";
import $ from "jquery";
import {VisitInterface} from "./VisitPage";

export const VISIT_URL = "http://localhost:8082/visit";
export const SAVE_VISIT_URL = VISIT_URL + "/save";

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