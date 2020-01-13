import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Store} from "./reducers/RootReducer";

ReactDOM.render(<Store ><App/></Store>, document.getElementById('root'));
serviceWorker.unregister();
