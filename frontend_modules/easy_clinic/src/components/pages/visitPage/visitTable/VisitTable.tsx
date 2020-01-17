import * as React from "react";
import {useEffect, useState} from "react";
import {useStore} from "../../../../reducers/RootReducer";
import Button from "@material-ui/core/Button";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Create} from "@material-ui/icons";
import {getVisits} from "../VisitService";

export interface VisitData {
    date: string;
    visitId: string;
    patient: string;
    specialist: string;
    specialisation: string;
}

export interface VisitTableProps {
    onOverviewClick: (visitId: string) => void
}

export const VisitTable: React.FC<VisitTableProps> = (props: VisitTableProps) => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [data, setData] = useState<VisitData[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(true);

    useEffect(() => {
        getVisits(state.id).then((resp: VisitData[]) => {
            setData(resp);
        });
        setDataLoading(false);
    }, [dataLoading]);

    return (
        <div>
            <Table >
                <TableHead className={'table-header'}>
                    <TableRow>
                        <TableCell className={'header-text'}>Date</TableCell>
                        <TableCell className={'header-text'}>Specialist</TableCell>
                        <TableCell className={'header-text'}>Patient</TableCell>
                        <TableCell className={'header-text'}>Specialisation</TableCell>
                        <TableCell className={'header-text'}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({date, visitId, patient, specialist, specialisation}) => (
                        <TableRow key={visitId}>
                            <TableCell component="th" scope="row">
                                {date}
                            </TableCell>
                            <TableCell>{specialist}</TableCell>
                            <TableCell>{patient}</TableCell>
                            <TableCell>{specialisation}</TableCell>
                            <TableCell>
                                <div className={'actions'}>
                                    <Button onClick={() => {
                                        props.onOverviewClick(visitId);
                                    }}>
                                        <Create className={'action'}/>
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