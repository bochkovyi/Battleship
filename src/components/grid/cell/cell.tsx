
import * as React from 'react';
import './cell.css';

export interface Props {
    clickHandler: Function;
    id: number;
    value: number;
}
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
        console.log(e.target, e.target.dataset.test);
        this.props.clickHandler(this.props.id);
    }
    render() {
        let classNameValue = 'cell-item ' + ((this.props.value === 0) ? 'free' : 'taken');
        return (
            <div className={classNameValue} data-test={this.props.id} onClick={this.handleClick} />
        );
    }
  }