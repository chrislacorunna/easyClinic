import $ from "jquery"
import {FirstStepData} from "./RegisterForm";

const SERVICE_URL: string = "http://localhost/user/";
const REGISTER_URL: string = SERVICE_URL + 'register';

export interface RegisterResponse {
    message: string;
}

export class Register {

    public registerFirstStep(data: FirstStepData, onSuccess: (n: number) => any) {
        return $.ajax({
            url: REGISTER_URL,
            method: "post",
            contentType: 'application/json',
            dataType: 'json',
            data: data
        }).done(resp => {
            onSuccess(resp.message);
        });
    }
}