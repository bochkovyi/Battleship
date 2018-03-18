import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Ship } from './Ship';
import { Grid, Props as BoardProps } from '../Grid/Grid';

const boardProps: BoardProps = {
    gameOver: false,
    gameStarted: true,
    boardUntoched: true,
    boardSize: 10,
    ships: [new Ship(10, 5, true)],
    clickHandler: (e: any) => console.log(e)
};

it('renders Board with a Ship without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Grid {...boardProps}/>, div);
});