
import * as React from 'react';
import './cell.css';

export interface Props {
    clickHandler: Function;
    id: number;
}

export function Cell({ clickHandler, id }: Props) {
  function handleClick (e: any) {
      console.log(e.target, e.target.dataset.test);
      clickHandler(id);
  }
  return (
        <div className="cell-item" data-test={id} onClick={handleClick} />
    );
}