import $ from "jquery";
import {ScheduleCreateData} from "./createSchedulePage/ScheduleCreate";

export const SCHEDULE_URL = "http://localhost:8081/schedule";
export const SAVE_SCHEDULE_URL = SCHEDULE_URL + '/save';
export const GET_SCHEDULE_URL = SCHEDULE_URL + '/get';

export const saveSchedule = (data: ScheduleCreateData) => {
    return $.ajax({
        url: SAVE_SCHEDULE_URL,
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

export const getSchedule = (employeeId: string) => {
    return $.ajax({
        url: GET_SCHEDULE_URL + '/' + employeeId,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        dataType: 'json',
    });
};