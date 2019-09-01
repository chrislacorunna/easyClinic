import React from 'react';
import logo from '../logo.svg';
import './App.css';
import {Header} from "../externalFrame/header/header";

function App() {
  return (
    <div className="App">
      <header className="app-header">
      </header>
      <body className="app-body">
        <Header />
      </body>
    </div>
  );
}

export default App;
