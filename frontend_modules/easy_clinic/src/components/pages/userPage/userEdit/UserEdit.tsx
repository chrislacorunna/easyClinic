import * as React from "react";
import {useEffect, useState} from "react";
import {UserType} from "../../../../reducers/Types";
import TextField from "@material-ui/core/TextField";
import {adminGetUser} from "../UserService";
import {UserDetails} from "../userOverview/UserOverview";
import './UserEdit.scss';
import {MenuItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export enum UserEditMode {
    EDIT, CREATE
}

export enum Profession {
    DENTIST = "Dentist",
    PEDIATRICIAN = "Pediatrician",
    INTERNIST = "Internist",
    OPTHALMOLOGIST = "Ophthalmologist",
    CARDIOLOGIST = "Cardiologist"
}

//todo: fetch professions from BE
export interface UserEditProps {
    id?: string;
    userType: UserType;
    mode: UserEditMode;
    onBackClick: () => void;
    onConfirm: (data: UserDetails) => void;
}

export enum Gender {
    MALE = 'male', FEMALE = 'female'
}

export const UserEdit: React.FC<UserEditProps> = (props: UserEditProps) => {
    const [data, setData] = useState<UserDetails>({id: ""});
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const genders = [Gender.FEMALE, Gender.MALE];
    const professions = [Profession.CARDIOLOGIST, Profession.DENTIST, Profession.INTERNIST,
        Profession.OPTHALMOLOGIST, Profession.PEDIATRICIAN];

    useEffect(() => {
        if (props.mode === UserEditMode.EDIT) {
            // @ts-ignore
            adminGetUser(props.id).then((resp: UserDetails) => {
                setData(resp);
                setDataLoading(false);
                setData({
                    ...data,
                    id: props.id
                });
            });
        } else {
            setDataLoading(false);
        }
    }, [dataLoading]);

    useEffect(() => {
        if (props.mode === UserEditMode.CREATE) {
            setData({
                ...data,
                userType: props.userType
            });
        }
    }, [data.userType]);

    return (
        <div>
            {(!dataLoading && <div className={'user-edit'}>
                {(props.mode === UserEditMode.EDIT && <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="id"
                    label="Internal ID"
                    name="id"
                    autoFocus
                    disabled={true}
                    defaultValue={props.id}
                    onChange={(event) => {
                        setData({
                            ...data,
                            id: event.target.value
                        });
                    }}
                />)}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    defaultValue={data && data.email}
                    onChange={(event) => {
                        setData({
                            ...data,
                            email: event.target.value
                        });
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    defaultValue={data && data.name}
                    onChange={(event) => {
                        setData({
                            ...data,
                            name: event.target.value
                        });
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="surname"
                    label="Surname"
                    name="surname"
                    autoFocus
                    defaultValue={data && data.surname}
                    onChange={(event) => {
                        setData({
                            ...data,
                            surname: event.target.value
                        });
                    }}
                />
                <TextField
                    variant="outlined"
                    type='date'
                    margin="normal"
                    fullWidth
                    id="birthdate"
                    label="Birth Darte"
                    name="birthdate"
                    autoFocus
                    defaultValue={data ? data.birthdate : '2000-01-01'}
                    onChange={(event) => {
                        setData({
                            ...data,
                            birthdate: event.target.value
                        });
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    defaultValue={data && data.address}
                    autoFocus
                    onChange={(event) => {
                        setData({
                            ...data,
                            address: event.target.value
                        });
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="gender"
                    select
                    label="Gender"
                    onChange={(event) => {
                        setData({
                            ...data,
                            gender: event.target.value,
                        });
                    }}
                    defaultValue={data && data.gender}
                    helperText="Please select your gender"
                >
                    {genders.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                {(props.userType === UserType.EMPLOYEE && <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="profession"
                    select
                    label="Profession"
                    onChange={(event) => {
                        setData({
                            ...data,
                            profession: event.target.value,
                        });
                    }}
                    defaultValue={data && data.profession}
                >
                    {professions.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>)}
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
                    onClick={() => {
                        props.onConfirm(data)
                    }}
                >
                    {props.mode === UserEditMode.EDIT ? 'Save' : 'Create'}
                </Button>
                &nbsp;
            </div>
        </div>

    );
}