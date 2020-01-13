import * as React from "react";
import {useEffect, useState} from "react";
import {DefaultPage} from "../../defaultPage/DefaultPage";
import './UserOverview.scss';
import {UserType} from "../../../../reducers/Types";
import Button from "@material-ui/core/Button";
import {adminGetUser} from "../UserService";

export interface UserDetails {
    name?: string,
    surname?: string,
    id?: string,
    profession?: string,
    group?: UserType,
    email?: string,
    birthdate?: string,
    gender?: string,
    address?: string,
    userType?: UserType
}

export interface UserOverviewProps {
    userType: UserType;
    id: string;
    onEditClick: () => void;
    onDeleteClick: (id: string) => void;
    onBackClick: () => void;
}

export const UserOverview: React.FC<UserOverviewProps> = (props: UserOverviewProps) => {
    const [data, setData] = useState<UserDetails>({id: ""});
    const [dataLoading, setDataLoading] = useState<boolean>(true);

    useEffect(() => {
        adminGetUser(props.id).then((resp: UserDetails) => {
            setData(resp);
            setDataLoading(false);
        });

    }, [dataLoading]);
    const overview = (
        <div>
            {(!dataLoading && <div className={'overview'}>
                <div className={'attribute-names'}>
                    <p><b>Internal ID: </b> </p>
                    <p><b>E-mail: </b> </p>
                    <p><b>Name: </b> </p>
                    <p><b>Surname: </b> </p>
                    <p><b>Gender: </b></p>
                    <p><b>Address: </b></p>
                    <p><b>Birth date: </b></p>
                </div>
                <div className={'attributes'}>
                    <p>{data.id}</p>
                    <p>{data.email}</p>
                    <p>{data.name}</p>
                    <p>{data.surname}</p>
                    <p>{data.gender}</p>
                    <p>{data.address}</p>
                    <p>{data.birthdate}</p>
                </div>
            </div>)}
            <div className={'flex'}>
                <Button
                    variant="contained"
                    onClick={() => props.onBackClick()}
                >
                    Back
                </Button>
                &nbsp;
                <Button
                    variant="contained"
                    className={'button'}
                    onClick={() => props.onEditClick()}
                >
                    Edit
                </Button>
                &nbsp;
                <Button
                    variant="contained"
                    className={'button'}
                    onClick={() => props.onDeleteClick(props.id)}
                >
                    Delete
                </Button>
            </div>
        </div>

    );

    return (
        <DefaultPage headerText={'User Overview'} component={overview}/>
    );
}