import React from 'react';
import './App.css';
import Header from "../components/header/header";

interface AppProps {
    currentSite: string;
}

class App extends React.Component<AppProps> {
  render() {
      return (
          <div className="App">
              <Header/>
              <body className="app-body">

              </body>
          </div>
      );
  }
}

export default App;
