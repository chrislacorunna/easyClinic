import * as React from "react";
import {DefaultPage} from "../defaultPage/DefaultPage";
import { TextareaAutosize } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {useState} from "react";
import {useStore} from "../../../reducers/RootReducer";
import './VisitPage.scss';
import TextField from "@material-ui/core/TextField";
import {saveVisit} from "./VisitService";

export interface VisitProps {
    date: string;
    employeeId: string;
    employeeDisplayName: string;
    onBack: () => void;
}

export interface VisitInterface {
    date: string;
    employeeId: string;
    additionalNotice: string;
    userId: string;
}

export const VisitPage:React.FC<VisitProps> = (props: VisitProps) => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [data, setData] = useState<VisitInterface>({
        date: props.date,
        employeeId: props.employeeId,
        userId: state.id,
        additionalNotice: ''
    });

    return (
        <DefaultPage
            headerText={"Visit overview"}
            component={
                <div>
                    <div className={'overview'}>
                        <div className={'attribute-names'}>
                            <p><b>Date: </b> </p>
                            <p><b>Doctor (profession): </b> </p>
                        </div>
                        <div className={'attributes'}>
                            <p>{props.date}</p>
                            <p>{props.employeeDisplayName}</p>
                        </div>
                    </div>
                    <TextField
                        placeholder="Additional notice..."
                        variant={'outlined'}
                        margin="normal"
                        multiline={true}
                        rows={2}
                        rowsMax={4}
                        onChange={(event) => {
                            setData({
                                ...data,
                                additionalNotice: event.target.value
                            })
                        }}
                    />
                    <div className={'flex'}>
                        <Button
                            className={'button'}
                            variant="contained"
                            onClick={() => {
                                saveVisit(data);
                            }}
                        >
                            Confirm
                        </Button>

                        <Button
                            className={'button'}
                            variant="contained"
                            onClick={() => props.onBack()}
                        >
                            Back
                        </Button>

                    </div>
                </div>
            }
        />
    )
}