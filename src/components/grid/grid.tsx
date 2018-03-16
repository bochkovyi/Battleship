import * as React from 'react';
import { Cell, CellData, SHIP_HIDDEN, SHIP_MISSED, SHIP_HIT } from './cell/cell';
import { Ship } from '../common/Ship';
import './grid.css';

export interface BoardState {
  grid: CellData[];
}

export interface Props {
  gameStarted: boolean;
}

export class Grid extends React.Component<Props, BoardState> {
  boardSize = 10;

  freshBoard() {
    let temp = new Array(this.boardSize * this.boardSize).fill(null);
    temp = temp.map(item => ({state: SHIP_HIDDEN, ship: null}));
    return temp;
  }

  newGame() {
    this.setState(state => {
      console.log('State before init', state);
      let temp = this.freshBoard();

      let ship = new Ship(10, 5, true);
      temp[0].ship = ship;
      temp[10].ship = ship;
      temp[20].ship = ship;
      temp[21].ship = ship;
      temp[22].ship = ship;
      console.log(temp);
      return {
        grid: temp
      };
    });
  }
  
  handleClick = (key: number) => {
    this.setState(state => {
      const temp = [...state.grid];
      if (this.props.gameStarted && temp[key].state === SHIP_HIDDEN) {
        if (temp[key].ship) {
          temp[key].state = SHIP_HIT;
        } else {
          temp[key].state = SHIP_MISSED;
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
    if (nextProps.gameStarted) {
      this.newGame();
    }
  }
}