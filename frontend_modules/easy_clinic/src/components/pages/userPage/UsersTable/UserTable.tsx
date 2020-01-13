import * as React from "react";
import {useEffect, useState} from "react";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {UserType} from "../../../../reducers/Types";
import TableBody from "@material-ui/core/TableBody";
import './UserTable.scss';
import {CheckCircle, Create, Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {useStore} from "../../../../reducers/RootReducer";
import {getUsers} from "../UserService";

interface UserTableProps {
    userType: UserType;
    onOverviewClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
    onUserCreate: () => void;
    onEnableClick: (id: string) => void;
}

export interface UserGeneralData {
    name: string;
    surname: string;
    id: string;
    profession?: string;
    enabled: boolean;
}

export const UserTable: React.FC<UserTableProps> = (props: UserTableProps) => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [data, setData] = useState<UserGeneralData[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(true);

    useEffect(() => {
        getUsers(props.userType).then((resp: UserGeneralData[]) => {
            setData(resp);
        });
        setDataLoading(false);
    }, [dataLoading]);

    const isEmployee = () => {
        return props.userType === UserType.EMPLOYEE;
    }

    return (
        <div>
            <div className={'flex'}>
                <Button
                    variant="contained"
                    className={'button'}
                    onClick={() => {
                        props.onUserCreate();
                    }}
                >
                    {'create ' + props.userType.toLowerCase()}
                </Button>
                &nbsp;
            </div>
            <Table >
                <TableHead className={'table-header'}>
                    <TableRow>
                        <TableCell className={'header-text'}>Name</TableCell>
                        <TableCell className={'header-text'}>Surname</TableCell>
                        <TableCell className={'header-text'}>Internal ID</TableCell>
                        {(isEmployee() && <TableCell className={'header-text'}>Profession</TableCell>)}
                        <TableCell className={'header-text w240px'}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({id, name, surname, profession, enabled}) => (
                        <TableRow key={id}>
                            <TableCell component="th" scope="row">
                                {name}
                            </TableCell>
                            <TableCell>{surname}</TableCell>
                            <TableCell>{id}</TableCell>
                            {(isEmployee() && <TableCell>{profession}</TableCell>)}
                            <TableCell>
                                <div className={'actions'}>
                                    <Button onClick={() => props.onOverviewClick(id)}>
                                        <Create className={'action'}/>
                                    </Button>
                                    <Button onClick={() => {
                                        props.onDeleteClick(id);
                                        setDataLoading(true);
                                    }}>
                                        <Delete className={'action'}/>
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (!enabled) {
                                                props.onEnableClick(id);
                                                setDataLoading(true);
                                            }
                                        }}>
                                        {(enabled && <CheckCircle className={'action'}/>)}
                                        {(!enabled && <CheckCircle className={'action-green'}/>)}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    )
}