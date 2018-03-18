import * as React from 'react';
import './App.css';

import Battleship from './components/Battleship';

class App extends React.Component {
  render() {
    const liArray = [
      'Let\'s create an onscreen grid of cells aligned within a square 10 by 10.',
      'Then we set up initial battle ships - 2 L shaped (5 and 6 length), 2 I shaped (5, 6) and 2 dot shaped.',
      'Initial battle ships cannot overlap.',
      'Start actual game play after any kind of user input which would simulate shots at random positions.',
      'Any missed shot would indicate already hit area.',
      'Any shot at any of initial ships would visually indicate that battle ship has sink.',
      'Program must be able to tell that all ships have sunk and game is over.',
      'Battle ships must not touch one another so there is at least a single cell between them.',
      'Any battle ship rotation must be random.',
      'Each ship must have outline color defining boundaries of a ship.',
      '[...document.querySelectorAll(\'.cell-item\')].forEach(item => item.click());'
    ];
    const gitHubLink = 'https://github.com/bochkovyi/Battleship';
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battleship</h1>
        </header>
        <ul className="App-description">
          {liArray.map((item, key) => <li key={key}>{item}</li>)}
        </ul>
        <Battleship />
        <footer className="footer">
          <p>Made by Bogdan Bochkovvyi.</p>
          <p>Source code can be found&nbsp;
            <a href={gitHubLink} target="blank" rel="nofollow noopener">here</a>.</p>
          <p>Web fonts from <a href="https://fonts.google.com/" target="blank" rel="nofollow noopener">Google</a>.</p>
        </footer>
      </div>
    );
  }
}

export default App;
