import * as React from 'react';
import { Grid } from './grid/grid';
import { Status } from './status/status';
import './Battleship.css';

class Battleship extends React.Component {
  render() {
    return (
      <div className="game-container">
        <div className="game-board-container">
        game-board
        <Grid />
        </div>
        <div className="game-status-container">
        game-status
        <Status />
        </div>
      </div>
    );
  }
}

export default Battleship;