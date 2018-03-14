import * as React from 'react';
import './App.css';

import Battleship from './components/Battleship';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battleship</h1>
        </header>
        <Battleship />
      </div>
    );
  }
}

export default App;
