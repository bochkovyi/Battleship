import * as React from 'react';
import { Grid } from './grid/grid';
import './Battleship.css';

class Battleship extends React.Component {
  render() {
    return (
      <div className="game-container">
        <div className="game-board">
        game-board
        <Grid />
        </div>
        <div className="game-status">
        game-status
        </div>
      </div>
    );
  }
}

export default Battleship;