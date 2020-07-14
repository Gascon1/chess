import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as PawnImage } from 'images/pawn.svg';
import { SpotsContext, Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface Props {
  white: boolean;
  tileInfo: Position;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
  setCastling: Function;
}

export default function Pawn(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const { tileInfo, white, setStartPosition, setAvailableMoves, setTileFocus, setCastling } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    pieceType: 'pawn',
    isWhite: true,
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);

  // const isMoveLegal = (currentPosition: Position, destination: Position) => {
  //   if (state.isWhite) {
  //     if (
  //       !state.hasUsedFirstMoved &&
  //       !destination.isOccupied &&
  //       destination.x - currentPosition.x === 0 &&
  //       destination.y - currentPosition.y === 2
  //     ) {
  //       setState({ ...state, hasUsedFirstMoved: true });
  //       return true;
  //     } else {
  //       // first, we check if the pawn is moving in a vertical line,
  //       // and if it is only going forward by 1 spot. Then, we check
  //       // if the pawn is going for a kill, which needs the destination
  //       // to be occuped, and both x and y increment by 1.
  //       return (
  //         (!destination.isOccupied &&
  //           destination.x - currentPosition.x !== 0 &&
  //           destination.y - currentPosition.y !== 1) ||
  //         (destination.isOccupied &&
  //           !destination.isFriendly &&
  //           destination.x - currentPosition.x !== 1 &&
  //           destination.y - currentPosition.y !== 1) ||
  //         (destination.isOccupied &&
  //           !destination.isFriendly &&
  //           destination.x - currentPosition.x !== -1 &&
  //           destination.y - currentPosition.y !== 1)
  //       );
  //     }
  //   } else {
  //     if (
  //       !state.hasUsedFirstMoved &&
  //       !destination.isOccupied &&
  //       destination.x - currentPosition.x === 0 &&
  //       destination.y - currentPosition.y === -2
  //     ) {
  //       setState({ ...state, hasUsedFirstMoved: true });
  //       return true;
  //     } else {
  //       return (
  //         (!destination.isOccupied &&
  //           destination.x - currentPosition.x !== 0 &&
  //           destination.y - currentPosition.y !== -1) ||
  //         (destination.isOccupied &&
  //           !destination.isFriendly &&
  //           destination.x - currentPosition.x !== -1 &&
  //           destination.y - currentPosition.y !== -1) ||
  //         (destination.isOccupied &&
  //           !destination.isFriendly &&
  //           destination.x - currentPosition.x !== -1 &&
  //           destination.y - currentPosition.y !== 1)
  //       );
  //     }
  //   }
  // };

  const availableMoves = (currentPosition: Position) => {
    const result: Array<any> = [];
    const currentSquare: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);
    //WHITE
    const forwardOnceWhite: Spots | undefined = getSpotDetails(
      currentPosition.x,
      currentPosition.y + 1,
    );
    const forwardTwiceWhite: Spots | undefined = getSpotDetails(
      currentPosition.x,
      currentPosition.y + 2,
    );
    const diagonalLeftWhite: Spots | undefined = getSpotDetails(
      currentPosition.x + 1,
      currentPosition.y + 1,
    );
    const diagonalRightWhite: Spots | undefined = getSpotDetails(
      currentPosition.x - 1,
      currentPosition.y + 1,
    );
    //BLACK
    const forwardOnceBlack: Spots | undefined = getSpotDetails(
      currentPosition.x,
      currentPosition.y - 1,
    );
    const forwardTwiceBlack: Spots | undefined = getSpotDetails(
      currentPosition.x,
      currentPosition.y - 2,
    );
    const diagonalLeftBlack: Spots | undefined = getSpotDetails(
      currentPosition.x + 1,
      currentPosition.y - 1,
    );
    const diagonalRightBlack: Spots | undefined = getSpotDetails(
      currentPosition.x - 1,
      currentPosition.y - 1,
    );

    if (currentSquare?.activePiece.color === 'white') {
      if (currentSquare.tileInfo.y === 2) {
        if (!forwardTwiceWhite?.isOccupied) {
          result.push({ x: forwardTwiceWhite?.tileInfo.x, y: forwardTwiceWhite?.tileInfo.y });
        }
      }
      if (!forwardOnceWhite?.isOccupied) {
        result.push({ x: forwardOnceWhite?.tileInfo.x, y: forwardOnceWhite?.tileInfo.y });
      }
      if (
        diagonalLeftWhite?.isOccupied &&
        diagonalLeftWhite.activePiece.color !== currentSquare.activePiece.color
      ) {
        result.push({ x: diagonalLeftWhite.tileInfo.x, y: diagonalLeftWhite.tileInfo.y });
      }
      if (
        diagonalRightWhite?.isOccupied &&
        diagonalRightWhite.activePiece.color !== currentSquare.activePiece.color
      ) {
        result.push({ x: diagonalRightWhite.tileInfo.x, y: diagonalRightWhite.tileInfo.y });
      }
    } else if (currentSquare?.activePiece.color === 'black') {
      if (currentSquare?.tileInfo.y === 7) {
        if (!forwardTwiceBlack?.isOccupied) {
          result.push({ x: forwardTwiceBlack?.tileInfo.x, y: forwardTwiceBlack?.tileInfo.y });
        }
      }
      if (!forwardOnceBlack?.isOccupied) {
        result.push({ x: forwardOnceBlack?.tileInfo.x, y: forwardOnceBlack?.tileInfo.y });
      }
      if (
        diagonalLeftBlack?.isOccupied &&
        diagonalLeftBlack.activePiece.color !== currentSquare.activePiece.color
      ) {
        result.push({ x: diagonalLeftBlack.tileInfo.x, y: diagonalLeftBlack.tileInfo.y });
      }
      if (
        diagonalRightBlack?.isOccupied &&
        diagonalRightBlack.activePiece.color !== currentSquare.activePiece.color
      ) {
        result.push({ x: diagonalRightBlack.tileInfo.x, y: diagonalRightBlack.tileInfo.y });
      }
    }

    if (!result.length) {
      result.push({ x: 0, y: 0 });
    }
    setCastling(false);
    return result;
  };

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    let availMoves = availableMoves(currentPosition);

    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <PawnImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => {
        onMoveStart(state.currentPosition, e);
      }}
    />
  );
}
