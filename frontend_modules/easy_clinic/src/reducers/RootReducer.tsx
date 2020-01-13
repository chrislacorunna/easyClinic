import {initialUserState, userReducer, UserState} from "./user/UserReducer";
import React, {createContext, useContext} from "react";


export interface UserContext {
    dispatch: Function,
    state: UserState
}

const contextInit: UserContext = {
    dispatch: () => {},
    state: initialUserState
};

export const stateCtx = createContext(contextInit);

export const Store: React.FC<{children: JSX.Element}> = (props) => {

    const [state, dispatch] = React.useReducer(userReducer, initialUserState);
    const value = { state, dispatch };

    return (
        <stateCtx.Provider value={value}>
            {props.children}
        </stateCtx.Provider>
    )
};

export const useStore = () => useContext(stateCtx);




