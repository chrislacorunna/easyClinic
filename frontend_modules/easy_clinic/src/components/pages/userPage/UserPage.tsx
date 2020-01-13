import * as React from "react";
import {useState} from "react";
import {UserType} from "../../../reducers/Types";
import {DefaultPage} from "../defaultPage/DefaultPage";
import {UserTable} from "./UsersTable/UserTable";
import {UserDetails, UserOverview} from "./userOverview/UserOverview";
import {createUser, deleteUser, enableUser, updateUser} from "./UserService";
import {UserEdit, UserEditMode} from "./userEdit/UserEdit";
import Button from "@material-ui/core/Button";

export interface UserPageProps {
    userType: UserType
}

export enum UserPageTab {
    LIST, OVERVIEW, EDIT, CREATE
}

export const UserPage: React.FC<UserPageProps> = (props: UserPageProps) => {
    const [currentTab, setCurrentTab] = useState(UserPageTab.LIST);
    const [currentUserId, setCurrentUserId] = useState('');

    var headerText = props.userType.toString().toLowerCase();
    headerText = headerText.charAt(0).toUpperCase() + headerText.substring(1, headerText.length);

    return (
        <div>
            {(currentTab === UserPageTab.LIST && <DefaultPage
                headerText={'UserManagement > ' + headerText}
                component={
                    <UserTable
                      userType={props.userType}
                      onOverviewClick={(id: string) => {
                        setCurrentTab(UserPageTab.OVERVIEW);
                        setCurrentUserId(id);
                      }}
                      onDeleteClick={(id: string) => {
                          deleteUser(id);
                          setCurrentTab(UserPageTab.LIST);
                      }}
                      onUserCreate={() => {
                          setCurrentTab(UserPageTab.CREATE);
                      }}
                      onEnableClick={(id: string) => {
                          enableUser(id);
                      }}
                    />
                }/>
            )}
            {(currentTab === UserPageTab.OVERVIEW && <UserOverview
                userType={props.userType}
                id={currentUserId}
                onDeleteClick={(currentUserId: string) => {
                    deleteUser(currentUserId);
                    setCurrentTab(UserPageTab.LIST);
                }}
                onEditClick={() => {
                    setCurrentTab(UserPageTab.EDIT);
                }}
                onBackClick={() => {
                    setCurrentTab(UserPageTab.LIST)
                }}/>

            )}
            {(currentTab === UserPageTab.EDIT && <DefaultPage
                    headerText={"User Edit"}
                    component={<UserEdit
                        userType={props.userType}
                        mode={UserEditMode.EDIT}
                        id={currentUserId}
                        onBackClick={() => {
                            setCurrentTab(UserPageTab.LIST)
                        }}
                        onConfirm={((data: UserDetails) => {
                            updateUser(data);
                            // @ts-ignore
                            setCurrentUserId(data.id);
                            setCurrentTab(UserPageTab.OVERVIEW);
                        })}/>
                    }/>
            )}
            {(currentTab === UserPageTab.CREATE && <DefaultPage
                    headerText={"User Create"}
                    component={<UserEdit
                        userType={props.userType}
                        mode={UserEditMode.CREATE}
                        onBackClick={() => {
                            setCurrentTab(UserPageTab.LIST);
                        }}
                        onConfirm={((data: UserDetails) => {
                            createUser(data).then((resp) => {
                                setCurrentUserId(resp['username']);
                                setCurrentTab(UserPageTab.OVERVIEW);
                            });
                        })}/>
                    }/>
            )}
        </div>
    )
}