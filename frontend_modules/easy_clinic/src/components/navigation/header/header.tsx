import React from 'react';

import './header.scss';
import {Link} from "react-router-dom";
import {UserType} from "../../../reducers/Types";
import {LOGIN_URL, LOGOUT_URL, REGISTRATION_URL} from "../Constants";
import {useStore} from "../../../reducers/RootReducer";

export interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {

    const [state, dispatch] = [useStore().state, useStore().dispatch];

    const getNavbar = () => {

        let homeElement = <li><Link to='/'>Home</Link></li>;
        let loginElement = <li><a href={LOGIN_URL}>Sign in</a></li>;
        let registerElement = <li><a href={REGISTRATION_URL}>Sign Up</a></li>;
        let profileElement = <li><Link to='/profile'>Profile</Link></li>;
        let logoutElement = <li><a href={LOGOUT_URL}>Sign Out</a></li>;

        return (
            <div>
                <ul className='navigation-panel'>
                    {homeElement}
                    {!isLoggedIn() && loginElement}
                    {!isLoggedIn() && registerElement}
                    {isLoggedIn() && profileElement}
                    {isLoggedIn() && logoutElement}
                </ul>
            </div>
        );
    }

    const isLoggedIn = () => {
        return state.userType !== UserType.DEFAULT;
    }

    return (
        <div className="header" >
            <div className="easy-clinic-logo">
                <img src="/header_logo_small.png"/>
            </div>
            <div className="gradient-element"></div>
            {getNavbar()}
        </div>
    );
}

export default Header
