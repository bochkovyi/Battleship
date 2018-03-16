import * as React from 'react';
import './status.css';

export interface Props {
  clickHandler: Function;
  gameStarted: boolean;
}

export class Status extends React.Component<Props, {}> {
  handleClick = (e: any) => {
      this.props.clickHandler();
  }
  render() {
    return (
      <div className="game-status">
          Game status!
          <button onClick={this.handleClick}>
            {this.props.gameStarted ? 'Restart game' : 'Start new game'}
          </button>
      </div>
    );
  }
}