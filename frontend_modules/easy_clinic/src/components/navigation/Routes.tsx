import {UserType} from "../../reducers/Types";
import * as React from "react";
import {Route} from "react-router";
import {LandingPage} from "../pages/landingPage/LandingPage";
import LoginProxy from "../login/loginProxy/LoginProxy";
import LogoutProxy from "../logout/LogoutProxy";
import {UserPage} from "../pages/userPage/UserPage";
import {ScheduleCreate} from "../pages/schedulePage/createSchedulePage/ScheduleCreate";
import {ScheduleOverview} from "../pages/schedulePage/scheduleOverview/ScheduleOverview";


interface RoutesProps {
    userType: UserType;
    isLoggedIn: boolean;
}

export const Routes: React.FC<RoutesProps> = (props: RoutesProps) => {
    const commonRoutes = (
        <div>
            <Route
                path='/'
                name='Main Page'
                render={()=> {
                    return (
                        !props.isLoggedIn && <LandingPage/>
                    )
                }
                }
            />
            <Route
                path='/logged_in'
                name ='logged in'
                render={() => <LoginProxy/>}
            />
            <Route
                path='/schedule'
                name ='schedule'
                render={() => <ScheduleOverview/>}
            />
            <Route
                path='/logout'
                name ='logged out'
                render={() => <LogoutProxy/>}
            />
        </div>
    )

    const userTypeSpecificRoutes = getUserSpecificRoutes(props.userType, props.isLoggedIn);

    return (
        <div>
            {commonRoutes}
            {userTypeSpecificRoutes}
        </div>
    )
}

export const getUserSpecificRoutes = (userType: UserType, isLoggedIn: boolean) => {
    switch (userType) {
        case UserType.ADMIN:
            return (
                <div>
                    <Route
                        path='/users'
                        name ='users'
                        render={() => isLoggedIn && <UserPage userType={UserType.CUSTOMER}/>}
                    />
                    <Route
                        path='/employees'
                        name ='employees'
                        render={() => isLoggedIn && <UserPage userType={UserType.EMPLOYEE}/>}
                    />
                    <Route
                        path='/admins'
                        name ='admins'
                        render={() => isLoggedIn && <UserPage userType={UserType.ADMIN}/>}
                    />
                </div>
            );
        case UserType.EMPLOYEE:
            return (
                <div>
                    <Route
                        path='/createschedule'
                        name ='create schedule'
                        render={() => isLoggedIn && <ScheduleCreate/>}
                    />
                </div>
            )
        case UserType.CUSTOMER:
            return (
                <div>

                </div>
            )
    }
}