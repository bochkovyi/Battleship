import * as React from 'react';
import { Cell, CellData, SHIP_HIDDEN, SHIP_MISSED, SHIP_HIT, SHIP_SUNK } from './Cell/Cell';
import { Ship } from '../common/Ship';
import './Grid.css';

export interface BoardState {
  grid: CellData[];
}

export interface Props {
  gameOver: boolean;
  gameStarted: boolean;
  boardUntoched: boolean;
  boardSize: number;
  ships: Ship[];
  clickHandler: Function;
}

export class Grid extends React.Component<Props, BoardState> {

  freshBoard() {
    let temp = new Array(this.props.boardSize ** 2).fill(null);
    temp = temp.map(item => ({state: SHIP_HIDDEN, ship: null}));
    return temp;
  }

  newGame() {
    this.setState((state, props) => {
      let temp = this.freshBoard();
      if (props.gameStarted && props.boardUntoched) {
        props.ships.forEach(item => item.placeShip(temp));
      }
      return {
        grid: temp
      };
    });
  }
  
  handleClick = (key: number) => {
    this.setState(state => {
      const temp = [...state.grid];
      if (!this.props.gameStarted || this.props.gameOver) {
        return console.log('Please start the game first!');
      }
      // this.props.ships.map(item => console.log(item.getPath()));
      
      // Do something only if cell is not touched
      if (temp[key].state === SHIP_HIDDEN) {
        // If clicked on gidden ship
        if (temp[key].ship) {
          temp[key].state = SHIP_HIT;
          temp[key].ship.hit();
          const isSunk = temp[key].ship.isSunk();
          // If this hit has sunk the ship
          if (isSunk) {
            const shipPath = temp[key].ship.getPath();
            shipPath.forEach(item => temp[item].state = SHIP_SUNK);
          }
          this.props.clickHandler(true);
        } else {
          temp[key].state = SHIP_MISSED;
          this.props.clickHandler(false);
        }
      }
      return {
        grid: temp
      };
    });
  }
  render() {
    return (
      <div className="grid">
        {this.state.grid.map((item: CellData, key: number) => 
            <Cell clickHandler={this.handleClick} key={key} id={key} cellData={item}/>
        )}
      </div>
    );
  }

  componentWillMount() {
    this.newGame();
  }

  componentWillReceiveProps(nextProps: any) {
    // Restart game only when props relate to status button action
    if (nextProps.gameStarted && nextProps.boardUntoched) {
      this.newGame();
    }
  }
}