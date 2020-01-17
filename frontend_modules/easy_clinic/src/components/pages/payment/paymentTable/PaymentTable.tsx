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
import {UserType} from "../../../../reducers/Types";
import {checkUserPaymentAsPaid, getAdminPayments, getUserPayments} from "../PaymentService";
import './PaymentTable.scss';

export interface PaymentData {
    visitId: string;
    userId: string;
    price: string;
    paid: boolean;
}


export const PaymentTable: React.FC = () => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [data, setData] = useState<PaymentData[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(true);

    useEffect(() => {
        if (state.userType === UserType.ADMIN) {
            getAdminPayments().then((resp: PaymentData[]) => {
                setData(resp);
            })
        } else {
            getUserPayments(state.id).then((resp: PaymentData[]) => {
                setData(resp);
            })
        }
        setDataLoading(false);
    }, [dataLoading]);

    return (
        <div>
            <Table >
                <TableHead className={'table-header'}>
                    <TableRow>
                        <TableCell className={'header-text'}>Visit ID</TableCell>
                        <TableCell className={'header-text'}>User ID</TableCell>
                        <TableCell className={'header-text'}>Price</TableCell>
                        <TableCell className={'header-text'}>Payment Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({userId, visitId, paid, price}) => (
                        <TableRow key={visitId}>
                            <TableCell component="th" scope="row">
                                {visitId}
                            </TableCell>
                            <TableCell>{userId}</TableCell>
                            <TableCell>{price}</TableCell>
                            {(state.userType === UserType.ADMIN && <TableCell>
                                <div className={'actions'}>
                                    <Button onClick={() => {
                                        checkUserPaymentAsPaid(visitId);
                                        setDataLoading(true);
                                    }}>
                                        {(paid && <Create className={'action'}/>)}
                                        {(!paid && <Create className={'action-green'}/>)}
                                    </Button>
                                </div>
                            </TableCell>)}
                            {(state.userType !== UserType.ADMIN && <TableCell>
                                <div className={'actions'}>
                                    {(!paid && 'WAITING FOR PAYMENT')}
                                    {(paid && 'PAID')}
                                </div>
                            </TableCell>)}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    )
}