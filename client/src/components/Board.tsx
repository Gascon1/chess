import React from 'react';
import Spot from './Spot';

export default function Board() {
  // Todo: integrate pieces into each square created in board;

  const board = [];
  const size = 8;
  for (let i = 0; i < size; i++) {
    const rows = [];
    for (let j = 0; j < size; j++) {
      var spotColor;
      if ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) {
        spotColor = 'red';
      } else {
        spotColor = 'grey';
      }
      rows.push(<Spot color={spotColor} />);
    }
    board.push(<div className="board-row">{rows}</div>);
  }

  function isEven(n: number) {
    return n % 2 === 0;
  }

  //need to figure out why className board fucks up chess pieces above
  return <div className="board">{board}</div>;
}
