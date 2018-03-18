import * as React from 'react';
import './Status.css';

export interface Props {
  clickHandler: Function;
  gameStarted: boolean;
  gameOver: boolean;
  totalShots: number;
  totalShipsSunk: number;
  hits: number;
}

export class Status extends React.Component<Props, {}> {
  handleClick = (e: any) => {
      this.props.clickHandler();
  }
  render() {
    return (
      <div className="game-status">
          <h1>Game status</h1>
          <button className={'btn btn-primary'} onClick={this.handleClick}>
            {!this.props.gameStarted || this.props.gameOver ? 'Start new game' : 'Restart game'}
          </button>
          <div className="game-status-details">
            <h4>Shots made: {this.props.totalShots}</h4>
            <h4>Hits: {this.props.hits}</h4>
            <h4>Sunk ships: {this.props.totalShipsSunk}</h4>
          </div>
          {this.props.gameOver && <h1>Game over</h1>}
      </div>
    );
  }
}