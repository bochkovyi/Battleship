
import * as React from 'react';
import './Cell.css';
import { Ship } from '../../common/Ship';

export interface Props {
    clickHandler: Function;
    id: number;
    cellData: CellData;
}

export interface CellData {
    state: number;
    ship: Ship;
}

export const SHIP_HIDDEN = 0;
export const SHIP_MISSED = 1;
export const SHIP_HIT = 2;
export const SHIP_SUNK = 3;

/*
export function Cell({ clickHandler, id }: Props) {
  function handleClick (e: any) {
      console.log(e.target, e.target.dataset.test);
      clickHandler(id);
  }
  return (
        <div className="cell-item" data-test={id} onClick={handleClick} />
    );
}*/

export class Cell extends React.Component<Props, {}> {
    handleClick = (e: any) => {
        // console.log(e.target, e.target.dataset.test);
        this.props.clickHandler(this.props.id);
    }
    render() {
        let classNameValue = 'cell-item';
        switch (this.props.cellData.state) {
            case SHIP_HIDDEN:
            classNameValue = `${classNameValue} hidden`;
            break;

            case SHIP_MISSED:
            classNameValue = `${classNameValue} missed`;
            break;

            case SHIP_HIT:
            classNameValue = `${classNameValue} hit`;
            break;

            case SHIP_SUNK:
            classNameValue = `${classNameValue} hit sunk`;
            break;

            default:
        }

        return (
            <div className={classNameValue} data-test={this.props.id} onClick={this.handleClick} />
        );
    }
  }