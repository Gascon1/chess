import React from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';

export default function generateBoard() {
  let board: any = [];
  const alphaPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numericPosition = 0;
  for (let j = 8; j > numericPosition; j--) {
    alphaPosition.forEach((value, i) => {
      let spotColor;
      if ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) {
        spotColor = 'beige';
      } else {
        spotColor = 'brown';
      }
      board.push(<Spot key={value + j} color={spotColor} position={value + j} />);
    });
  }

  return board;
}
