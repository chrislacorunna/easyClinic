import React from 'react';

import './header.scss';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export enum AppMode {
    DEFAULT, ADMIN, CUSTOMER
}

export interface HeaderState {
    currentAppMode: AppMode;
}

export interface HeaderProps {
}


class Header extends React.Component<HeaderProps, HeaderState> {

    componentWillMount(): void {
        this.state = {
            currentAppMode: AppMode.DEFAULT
        }
    }

    render(): React.ReactElement {
        return (
            <div className="header" >
                <div className="easy-clinic-logo">
                    <img src="/header_logo_small.png"/>
                </div>
                <div className="gradient-element"></div>
                {this.getNavbar()}
            </div>
        );
    }

    public getNavbar()  {
        let homeElement = <li><Link to='/'>Home</Link></li>;
        let loginElement = <li><Link to='/login'>Sign In</Link></li>;
        let registerElement = <li><Link to='/register'>Sign Up</Link></li>

        switch (this.state.currentAppMode) {
            case (AppMode.DEFAULT): {
                return (
                    <Router>
                        <ul className='navigation-panel'>
                            {homeElement}
                            {loginElement}
                            {registerElement}
                        </ul>
                    </Router>
                )
            };
        default:
            return null;
        }
    }
}

export default Header;