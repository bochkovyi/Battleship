import * as React from 'react';
import { Cell } from './cell/cell';
import { Ship } from '../common/Ship';
import './grid.css';

export interface BoardState {
  grid: number[];
}

export class Grid extends React.Component<object, BoardState> {
  boardSize = 10;
  constructor(props: object) {
    super(props);
    this.state = {
      grid: new Array(this.boardSize * this.boardSize).fill(0)
    };
  }
  handleClick = (key: number) => {
    this.setState(state => {
      const temp = [...state.grid];
      temp[key] = 1;
      return {
        grid: temp
      };
    });
  }
  render() {
    return (
      <div className="grid">
        {this.state.grid.map((item, key) => 
            <Cell clickHandler={this.handleClick} key={key} id={key} value={item}/>
        )}
      </div>
    );
  }

  componentWillMount() {
    console.log('Mounting', new Ship(10, 180, true));
    
  }
}