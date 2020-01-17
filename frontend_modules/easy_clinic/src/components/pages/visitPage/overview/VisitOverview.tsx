import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {getVisitDetails} from "../VisitService";

export interface VisitOverviewInterface {
    date: string;
    specialist: string;
    specialisation: string;
    patient: string;
    price: string;
    additionalNotice: string;
}

export interface VisitOverviewProps {
    visitId: string;
    onBackClick: () => void;
}

export const VisitOverview: React.FC<VisitOverviewProps> = (props: VisitOverviewProps) => {

    const [data, setData] = useState<VisitOverviewInterface>({
        date: '',
        specialist: '',
        specialisation: '',
        patient: '',
        price: '',
        additionalNotice: '',
    });
    const [dataLoading, setDataLoading] = useState<boolean>(true);

    useEffect(() => {
        getVisitDetails(props.visitId).then((resp: VisitOverviewInterface) => {
            setData(resp);
            setDataLoading(false);
        });

    }, [dataLoading]);

    return (
        <div>
            {(!dataLoading && <div className={'overview'}>
                <div className={'attribute-names'}>
                    <p><b>Date: </b> </p>
                    <p><b>Specialist: </b> </p>
                    <p><b>Specialisation: </b> </p>
                    <p><b>Patient: </b> </p>
                    <p><b>Price: </b></p>
                    <p><b>Additional notice: </b></p>
                </div>
                <div className={'attributes'}>
                    <p>{data.date}</p>
                    <p>{data.specialist}</p>
                    <p>{data.specialisation}</p>
                    <p>{data.patient}</p>
                    <p>{data.price}</p>
                    <p>{data.additionalNotice}</p>
                </div>
            </div>)}
            <div className={'flex'}>
                <Button
                    variant="contained"
                    onClick={() => props.onBackClick()}
                >
                    Back
                </Button>
            </div>
        </div>
    )
}