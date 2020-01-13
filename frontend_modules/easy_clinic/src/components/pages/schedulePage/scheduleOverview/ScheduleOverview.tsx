import * as React from "react";
import {useEffect, useState} from "react";
import {useStore} from "../../../../reducers/RootReducer";
import {DefaultPage} from "../../defaultPage/DefaultPage";
import {UserType} from "../../../../reducers/Types";
import {MenuItem} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {getUsers} from "../../userPage/UserService";
import {UserGeneralData} from "../../userPage/UsersTable/UserTable";
import {getSchedule, saveSchedule} from "../ScheduleService";
import Button from "@material-ui/core/Button";
import {VisitPage, VisitProps} from "../../visitPage/VisitPage";


export interface ScheduleItem {
    time: string;
    id: string;
    reservated: boolean;
}

export interface ScheduleOverview {
    date: string;
    items: ScheduleItem[];
}

export enum ScheduleOverviewPages {
    OVERVIEW, VISIT
}


export const ScheduleOverview: React.FC = () => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [employee, setEmployee] = useState<UserGeneralData>({
        name: '',
        surname: '',
        id: '',
        profession: '',
        enabled: true,
    });
    const [employees, setEmployees] = useState<UserGeneralData[]>([]);
    const [data, setData] = useState<ScheduleOverview[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<ScheduleOverviewPages>(ScheduleOverviewPages.OVERVIEW);
    const [visitProps, setVisitProps] = useState<VisitProps>({
        date: '',
        employeeId: '',
        employeeDisplayName: '',
        onBack: () => setCurrentPage(ScheduleOverviewPages.OVERVIEW)
    });

    useEffect(() => {
        getUsers(UserType.EMPLOYEE).then((resp: UserGeneralData[]) => {
            setEmployees(resp);
            setDataLoading(false);
            if (state.userType === UserType.EMPLOYEE) {
                resp.forEach(emp => {
                    if (state.id === emp.id) {
                        setEmployee(emp);
                    }
                })
            }
        });


    }, [dataLoading]);
    useEffect(() => {
        if (employee.id !== '') {
            getSchedule(employee.id).then((resp: ScheduleOverview[])  => {
                setData(resp);
                setTimeout(() => {
                }, 1000);
            });
        }
    }, [employee.id]);

    return (
        <div>
            {currentPage === ScheduleOverviewPages.VISIT && visitProps.employeeId !== '' &&
                <VisitPage
                    date={visitProps.date}
                    employeeId={visitProps.employeeId}
                    employeeDisplayName={visitProps.employeeDisplayName}
                    onBack={visitProps.onBack}/>}
            {currentPage === ScheduleOverviewPages.OVERVIEW && <DefaultPage
                headerText={'Schedule'}
                component={
                    <div>
                        {(state.userType !== UserType.EMPLOYEE &&
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="employee"
                                select
                                label="Choose specialist"
                                onChange={(event) => {
                                    employees.forEach(one => {
                                        if (event.target.value === one.id) {
                                            setEmployee(one);
                                        }
                                    })
                                }}
                            >
                                {employees.map(employeeItem => (
                                    <MenuItem key={employeeItem.name + ' ' + employeeItem.surname + ' (' + employeeItem.profession + ')'}
                                              value={employeeItem.id}>
                                        {employeeItem.name + ' ' + employeeItem.surname + ' (' + employeeItem.profession + ')'}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                        <div>
                            {data.map(item =>
                                (
                                    <div>
                                        <h4>{item.date}</h4>
                                        <div className={'flex'}>
                                            {item.items.map(record => (
                                                <Button
                                                    onClick={() => {
                                                        setVisitProps({
                                                            ...visitProps,
                                                            employeeId: employee.id,
                                                            employeeDisplayName: employee.name + ' ' + employee.surname + ' (' + employee.profession + ')',
                                                            date: item.date + ' ' + record.time
                                                            })
                                                        setCurrentPage(ScheduleOverviewPages.VISIT);
                                                        }}>

                                                    {record.time}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                }/>}
        </div>

    )
}