import * as React from "react";
import './DefaultPage.scss'
export interface DefaultPageProps {
    headerText: string;
    component: React.ReactElement
}

export const DefaultPage: React.FC<DefaultPageProps> = (props: DefaultPageProps) => {

    return (
      <div className='default-page'>
          <h2>{props.headerText}</h2>
          <div className='line'></div>
          {props.component}
      </div>
    );
}