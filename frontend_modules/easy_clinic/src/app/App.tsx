import React, {useEffect} from 'react';
import './App.scss';
import Header from "../components/navigation/header/header";
import {Route} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import SidebarMenu from "../components/navigation/sidebarMenu/SidebarMenu";
import LoginProxy from "../components/login/loginProxy/LoginProxy";
import {useStore} from "../reducers/RootReducer";
import {UserType} from "../reducers/Types";
import {LandingPage} from "../components/pages/landingPage/LandingPage";
import LogoutProxy from "../components/logout/LogoutProxy";
import {LoginProxyHelper} from "../components/login/loginProxy/LoginProxyHelper";
import {setUserEmail, setUserId, setUserType} from "../reducers/user/UserActions";
import {UserPage} from "../components/pages/userPage/UserPage";
import {Routes} from "../components/navigation/Routes";

interface AppProps {

}

export const App: React.FC<AppProps> = () => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const isLoggedIn = state && state.userType !== UserType.DEFAULT;

    window.addEventListener('unload', (event) => {
        localStorage.setItem('jwt', state.jwt)
    });

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt: string = localStorage.getItem('jwt') as string;
            const parsedJwt = new LoginProxyHelper().getParsedToken(jwt);
            dispatch(setUserId(parsedJwt.id));
            dispatch(setUserEmail(parsedJwt.email));
            dispatch(setUserType(UserType.ADMIN));


        }

    }, [state.userType]);
    return (
      <div className="App">
          <Router>
              <Header/>
              <div className={'main-view'}>
                  {isLoggedIn && <SidebarMenu/>}
                  <Routes userType={state.userType} isLoggedIn={isLoggedIn} />
              </div>
          </Router>
          <div className={"app-footer"}>
              <p className={"footer-text"}> EasyClinic &copy; 2020</p>
          </div>
      </div>
    );
}

export default App;
