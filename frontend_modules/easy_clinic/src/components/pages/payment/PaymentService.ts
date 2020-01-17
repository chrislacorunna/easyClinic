import {UserType} from "../../../reducers/Types";
import $ from "jquery";

export const PAYMENT_URL = "http://localhost:8083/payment";
export const GET_ALL_PAYMENTS_URL = PAYMENT_URL + "/admin/get";
export const GET_USER_PAYMENT_URL = PAYMENT_URL + '/get';
export const CHECK_AS_PAID_URL = PAYMENT_URL + '/admin/check';

export const getAdminPayments = () => {
    return $.ajax({
        url: GET_ALL_PAYMENTS_URL,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

export const getUserPayments = (id: string) => {
    return $.ajax({
        url: GET_USER_PAYMENT_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

export const checkUserPaymentAsPaid = (id: string) => {
    return $.ajax({
        url: CHECK_AS_PAID_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

