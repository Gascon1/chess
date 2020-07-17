import React from 'react';
import { ReactComponent as BishopImage } from 'images/bishop.svg';
import { ReactComponent as RookImage } from 'images/rook.svg';
import { ReactComponent as KnightImage } from 'images/knight.svg';
import { ReactComponent as QueenImage } from 'images/queen.svg';

interface Props {
  endPawn: {
    flag: boolean;
    color: string;
  };
  setPromotion: Function;
}

export default function promotion(props: Props) {
  const { endPawn, setPromotion } = props;
  return (
    <div className='promotion' style={endPawn.flag ? { display: 'flex' } : { display: 'none' }}>
      <span className='promotion squareP beige'>
        <QueenImage
          className={`piece ${endPawn.color}`}
          onClick={(e) => {
            let queenPromotion = {
              pieceType: 'queen',
              color: endPawn.color,
            };
            setPromotion(queenPromotion);
          }}
        />
      </span>
      <span className='promotion squareP brown'>
        <KnightImage
          className={`piece ${endPawn.color}`}
          onClick={(e) => {
            let knightPromotion = {
              pieceType: 'knight',
              color: endPawn.color,
            };
            setPromotion(knightPromotion);
          }}
        />
      </span>
      <span className='promotion squareP beige'>
        <RookImage
          className={`piece ${endPawn.color}`}
          onClick={(e) => {
            let rookPromotion = {
              pieceType: 'rook',
              color: endPawn.color,
            };
            setPromotion(rookPromotion);
          }}
        />
      </span>
      <span className='promotion squareP brown'>
        <BishopImage
          className={`piece ${endPawn.color}`}
          onClick={(e) => {
            let bishopPromotion = {
              pieceType: 'bishop',
              color: endPawn.color,
            };
            setPromotion(bishopPromotion);
          }}
        />
      </span>
    </div>
  );
}
