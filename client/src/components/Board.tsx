import React from 'react';
import Spot from './Spot';

export default function Board() {
  // Todo: integrate pieces into each square created in board;

  const board = [];
  const size = 8;

  let spotColor;
  let labelRow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  let labelColumn = [1, 2, 3, 4, 5, 6, 7, 8];
  labelColumn = labelColumn.reverse();

  for (let rowCounter = 0; rowCounter < size; rowCounter++) {
    const rows = [];
    for (let columnCounter = 0; columnCounter < size; columnCounter++) {
      if ((isEven(rowCounter) && isEven(columnCounter)) || (!isEven(rowCounter) && !isEven(columnCounter))) {
        spotColor = 'red';
      } else {
        spotColor = 'grey';
      }

      if (rowCounter === size - 1) {
        rows.push(<Spot color={spotColor} label={labelRow[columnCounter]} direction="row" />);
      } else if (columnCounter === size - 1) {
        rows.push(<Spot color={spotColor} label={labelColumn[rowCounter]} direction="column" />);
      } else {
        rows.push(<Spot color={spotColor} />);
      }
    }
    board.push(<div className="board-row">{rows}</div>);
  }

  function isEven(n: number) {
    return n % 2 === 0;
  }

  //need to figure out why className board fucks up chess pieces above
  return <div className="boardSpace">{board}</div>;
}
