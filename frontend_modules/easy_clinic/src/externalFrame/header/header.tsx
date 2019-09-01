import React, { FunctionComponent } from 'react';
import './header.scss';

export interface HeaderState {

}

export interface HeaderProps {

}

export const Header: FunctionComponent<HeaderProps> = () => {
   return (
       <div className="logo">
          <img src="/header_logo_small.png"/>
       </div>iv

   );
}