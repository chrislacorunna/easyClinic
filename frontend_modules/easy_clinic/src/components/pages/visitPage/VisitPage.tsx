import * as React from "react";
import {useState} from "react";
import {DefaultPage} from "../defaultPage/DefaultPage";
import {VisitTable} from "./visitTable/VisitTable";
import {VisitOverview} from "./overview/VisitOverview";

export enum CurrentVisitPage {
    TABLE, OVERVIEW
}

export const VisitPage: React.FC = () => {

    const [visitId, setVisitId] = useState('');
    const [currentPage, setCurrentPage] = useState<CurrentVisitPage>(CurrentVisitPage.TABLE);

    return (
        <div>
            {currentPage === CurrentVisitPage.TABLE && (
                <DefaultPage headerText={'Visits'} component={
                    <VisitTable onOverviewClick={(visitId) => {
                        setVisitId(visitId);
                        setCurrentPage(CurrentVisitPage.OVERVIEW);
                    }}/>
                }/>
            )}
            {currentPage === CurrentVisitPage.OVERVIEW && (
                <DefaultPage headerText={'Visit Overview'} component={
                    <VisitOverview visitId={visitId} onBackClick={
                        () => {
                            setCurrentPage(CurrentVisitPage.TABLE);
                        }
                    }/>
                }/>
            )}
        </div>

    )
}