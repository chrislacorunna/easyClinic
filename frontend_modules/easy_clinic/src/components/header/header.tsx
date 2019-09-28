import React from 'react';

import './header.scss';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {AppMode} from "../../reducers/Types";
import {connect} from "react-redux";
import {StoreState} from "../../reducers";

export interface HeaderState {
    appMode: AppMode;
}

export interface HeaderProps {
    appMode: AppMode;
}

class Header extends React.Component<HeaderProps, HeaderState> {

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

    private getNavbar()  {
        let homeElement = <li><Link to='/'>Home</Link></li>;
        let loginElement = <li><Link to='/login'>Sign In</Link></li>;
        let registerElement = <li><Link to='/register'>Sign Up</Link></li>;

        let defaultCollection = (
            <ul className='navigation-panel'>
                {homeElement}
                {loginElement}
                {registerElement}
            </ul>
        );

        let navbarCollection;

        switch (this.props.appMode) {
            case (AppMode.DEFAULT): {
                navbarCollection = defaultCollection;
            };
            break;
        default:
            return null;
        }

        return (
            <Router>
                {navbarCollection}
            </Router>
        )
    }
}

const mapStateToProps = (state: StoreState) : HeaderProps => ({
    appMode: state.appReducer.appMode
})

export default connect(mapStateToProps)(Header)
