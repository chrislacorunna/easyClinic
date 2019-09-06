import React from 'react';

import './header.scss';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export interface HeaderState {
chuj: string;
}

export interface HeaderProps {

}

class Header extends React.Component<HeaderProps, HeaderState> {

    render(): React.ReactElement {
        return (
            <div className="header" >
                <div className="easy-clinic-logo">
                    <img src="/header_logo_small.png"/>
                </div>
                <div className="gradient-element"></div>
                <Router>
                    <ul className="navigation-panel">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/login'>Sign In</Link>
                        </li>
                        <li>
                            <Link to='/register'>Sign Up</Link>
                        </li>
                    </ul>
                </Router>


            </div>

        );
    }
}

export default Header;