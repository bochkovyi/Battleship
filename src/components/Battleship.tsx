import * as React from 'react';
import { Grid } from './grid/grid';
import { Status } from './status/status';
import './Battleship.css';

export interface GameState {
  gameStarted: boolean;
}

class Battleship extends React.Component<{}, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameStarted: false
    };
  }

  startGame = () => this.setState({gameStarted: true});
  
  render() {
    return (
      <div className="game-container">
        <div className="game-board-container">
        game-board
        <Grid gameStarted={this.state.gameStarted}/>
        </div>
        <div className="game-status-container">
        game-status
        <Status clickHandler={this.startGame} gameStarted={this.state.gameStarted}/>
        </div>
      </div>
    );
  }
}

export default Battleship;