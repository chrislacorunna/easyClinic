import React, {useEffect} from "react";
import {setUserEmail, setUserId, setUserJwt, setUserType} from "../../reducers/user/UserActions";
import {UserType} from "../../reducers/Types";
import {useStore} from "../../reducers/RootReducer";
import {Redirect} from "react-router-dom";


const LogoutProxy: React.FC = () => {

    const [state, dispatch] = [useStore().state, useStore().dispatch];

    useEffect(() => {
        dispatch(setUserEmail(''));
        dispatch(setUserId(''));
        dispatch(setUserType(UserType.DEFAULT));
        dispatch(setUserJwt(''));
    }, []);

    localStorage.clear();

    return (
        <Redirect to={'/'}/>
    )
}

export default LogoutProxy;