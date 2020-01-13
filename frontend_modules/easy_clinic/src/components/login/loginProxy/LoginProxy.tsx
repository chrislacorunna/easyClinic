import React, {useEffect, useState} from "react";
import {LoginProxyHelper, ParsedJWT} from "./LoginProxyHelper";
import {setUserEmail, setUserId, setUserJwt, setUserType} from "../../../reducers/user/UserActions";
import {UserType} from "../../../reducers/Types";
import {useStore} from "../../../reducers/RootReducer";
import {Redirect} from "react-router-dom";
import $ from "jquery";
import {ADMIN_GET_USER_URL, SERVICE_URL} from "../../pages/userPage/UserService";
import {DefaultPage} from "../../pages/defaultPage/DefaultPage";
import {LOGOUT_URL, REGISTRATION_URL} from "../../navigation/Constants";
import Button from "@material-ui/core/Button";

interface LoginProxyProps {

}
export const LOGIN_CHECK_URL = SERVICE_URL + '/logincheck';
export const performCheck = (id: string) => {
    return $.ajax({
        url: LOGIN_CHECK_URL + '/' + id,
        method: "GET",
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });
};

const LoginProxy: React.FC<LoginProxyProps> = () => {

    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [loginPerformed, setLoginPerformed] = useState<boolean>(false);
    const helper = new LoginProxyHelper();
    const jwt = window.location.href.split('#')[1].split('&')[0];
    const decodedTokenData: ParsedJWT =
        helper.getParsedToken(jwt);

    useEffect(() => {
        performCheck(decodedTokenData.id).then(group => {
            dispatch(setUserType(group));
            setLoginPerformed(true);
        }).catch(() => {
            setLoginPerformed(true);
        })
        dispatch(setUserEmail(decodedTokenData.email));
        dispatch(setUserId(decodedTokenData.id));

        dispatch(setUserJwt(jwt));
    }, [decodedTokenData.email, decodedTokenData.id, jwt]);

    return (
        <div>
            {(loginPerformed && state.userType !== UserType.NO_GROUP && <Redirect to={'/'}/>)}
                    <DefaultPage
                        headerText={"Activate Account"}
                        component={
                            <div>
                                <p>
                                    To start using Your account please
                                    contact Your administrator (+48 000 000 000)
                                    and finish the verification process. Please do the call as
                                    soon as possible, as you will not be able to log in until the
                                    verification is finished.
                                </p>
                                <Button
                                    variant="contained"
                                    classes={{root: 'submit'}}
                                    href={LOGOUT_URL}
                                >
                                    Logout
                                </Button>/>
                            </div>
                        }
                    />
        </div>
    )
}

export default LoginProxy;