import * as React from 'react';
import { Cell } from './cell/cell';
import './grid.css';

export class Grid extends React.Component {

  handleClick = (...args: any[]) => console.log(args);
  render() {
    return (
      <div className="grid">
        {new Array(100).fill(0).map((item, key) => 
            <Cell clickHandler={this.handleClick} key={key} id={key}/>
        )}
      </div>
    );
  }
}