import * as React from 'react';
import { Grid } from './Grid/Grid';
import { Status } from './Status/Status';
import { Ship } from './common/Ship';
import './Battleship.css';

export interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  boardUntoched: boolean;
  totalShots: number;
  totalShipsSunk: number;
  hits: number;
}

class Battleship extends React.Component<{}, GameState> {

  private ships: Ship[];
  private boardSize: number;

  constructor(props: any) {
    super(props);
    this.state = this.createFreshState();

    this.boardSize = 10;
    this.ships = this.createShips();
  }

  handleCellClick = (isHit: boolean) => {
    const sunkCount = this.countSunkShips();
    const isGameOver = this.ships.length === sunkCount;
    this.setState(state => ({
      gameOver: isGameOver,
      boardUntoched: false,
      totalShots: state.totalShots + 1,
      hits: isHit ? state.hits + 1 : state.hits,
      totalShipsSunk: sunkCount
    }));
  }

  createFreshState() {
    return {
      gameStarted: false,
      gameOver: false,
      boardUntoched: true,
      totalShots: 0,
      totalShipsSunk: 0,
      hits: 0
    };
  }

  createShips() {
    return [
      new Ship(this.boardSize, 6, false),
      new Ship(this.boardSize, 5, false),
      new Ship(this.boardSize, 6, true),
      new Ship(this.boardSize, 5, true),
      new Ship(this.boardSize, 1, true),
      new Ship(this.boardSize, 1, true)
    ];
  }

  handleButtonClick = () => {
    // Don't need to create ships first time the start game button is pressed
    if (!this.state.boardUntoched) {
      this.ships = this.createShips();
    }
    this.setState({...this.createFreshState(), gameStarted: true});
  }

  countSunkShips() {
    return this.ships.reduce((count, ship) => ship.isSunk() ? count + 1 : count, 0);
  }
  
  render() {
    return (
      <div className="game-container">
        <div className="game-board-container">
          <Grid clickHandler={this.handleCellClick} {...this.state} boardSize={this.boardSize} ships={this.ships}/>
        </div>
        <div className="game-status-container">
          <Status clickHandler={this.handleButtonClick} {...this.state}/>
        </div>
      </div>
    );
  }
}

export default Battleship;