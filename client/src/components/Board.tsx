import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';
import Promotion from 'components/Promotion';
import CheckDisplay from 'components/CheckDisplay';
import { SpotsContext } from 'context/SpotsContext';
import Timer from 'components/Timer';
import { renderIntoDocument } from 'react-dom/test-utils';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface Props {
  turn: number;
  activePlayer: string;
  setTurn: Function;
  setActivePlayer: Function;
  setIsGameOver: Function;
  setTypeOfWin: Function;
  setCheck: Function;
}

export default function Board(props: Props) {
  const { getSpotDetailsByName } = useContext(SpotsContext);
  const {
    turn,
    activePlayer,
    setTurn,
    setActivePlayer,
    setIsGameOver,
    setTypeOfWin,
    setCheck,
  } = props;

  const [state, setState] = useState({
    board: [],
    startPosition: {
      activePiece: {
        pieceType: '',
        color: '',
      },
      tile: '',
      x: 0,
      y: 0,
    },
    destination: {
      activePiece: {
        pieceType: '',
        color: '',
      },
      tile: '',
      x: 0,
      y: 0,
    },
    tileFocus: '',
    availableMoves: [
      {
        x: 0,
        y: 0,
      },
    ],
    killPosition: '',
    castling: false,
    endPawn: { color: '', flag: false },
    deletePawn: {
      tile: '',
      x: 0,
      y: 0,
    },
    promotion: {
      pieceType: '',
      color: '',
    },
    allAvailableMoves: { white: [{ x: 0, y: 0 }], black: [{ x: 0, y: 0 }] },
  });

  let board: any = [];

  function setAllAvailableMoves(color: string, availableMove: any) {
    // WHITE CASE
    if (availableMove?.length > 0 && color === 'white') {
      setState((prev) => {
        let whiteCopy = prev.allAvailableMoves.white.slice();
        whiteCopy.push(...availableMove);
        whiteCopy = whiteCopy.filter(
          (item, index, self) => index === self.findIndex((w) => w.x === item.x && w.y === item.y),
        );
        return {
          ...prev,
          allAvailableMoves: {
            ...prev.allAvailableMoves,
            white: [...whiteCopy],
          },
        };
      });
    }
    // BLACK CASE
    if (availableMove?.length > 0 && color === 'black') {
      setState((prev) => {
        let blackCopy = prev.allAvailableMoves.black.slice();
        blackCopy.push(...availableMove);
        blackCopy = blackCopy.filter(
          (item, index, self) => index === self.findIndex((w) => w.x === item.x && w.y === item.y),
        );
        return {
          ...prev,
          allAvailableMoves: {
            ...prev.allAvailableMoves,
            black: [...blackCopy],
          },
        };
      });
    }

    if (availableMove === null && color === 'white') {
      setState((prev) => ({
        ...prev,
        allAvailableMoves: {
          ...prev.allAvailableMoves,
          white: [],
        },
      }));
    }
    if (availableMove === null && color === 'black') {
      setState((prev) => ({
        ...prev,
        allAvailableMoves: {
          ...prev.allAvailableMoves,
          black: [],
        },
      }));
    }
  }

  function setPromotion(promotion: any) {
    setState((prev) => ({
      ...prev,
      promotion: promotion,
    }));
  }

  function setDeletePawn(deletePawn: Position) {
    setState((prev) => ({
      ...prev,
      deletePawn,
    }));
  }

  function setEndPawn(color: string, flag: boolean) {
    setState((prev) => ({
      ...prev,
      endPawn: { flag, color },
    }));
  }

  function setCastling(boolean: boolean) {
    setState((prev) => ({
      ...prev,
      castling: boolean,
    }));
  }

  function setDestination(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      destination: { activePiece: { pieceType, color }, ...tileInfo },
    }));
  }

  const setKillPosition = (tileInfo: Position, castling: boolean, promotion: boolean) => {
    if (state.tileFocus !== tileInfo.tile) {
      setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    }
    // promotion case
    else if (promotion) {
      setState((prev) => ({ ...prev, killPosition: tileInfo.tile }));
    }
    // castling case
    if (castling) {
      setState((prev) => ({ ...prev, killPosition: tileInfo.tile }));
    }
  };

  function setStartPosition(tileInfo: Position, pieceType: string, color: string) {
    setState((prev) => ({
      ...prev,
      startPosition: { activePiece: { pieceType, color }, ...tileInfo },
    }));
  }

  const setTileFocus = (tilePosition: string) => {
    setState((prev) => ({ ...prev, tileFocus: tilePosition }));
  };

  const setAvailableMoves = (availableMoves: any) => {
    setState((prev) => ({ ...prev, availableMoves }));
  };

  // useEffect(() => {
  //   let blackKing = getSpotDetailsByName('king', 'black');
  //   let whiteKing = getSpotDetailsByName('king', 'white');

  //   const allWhiteAvailMoves = JSON.stringify(state.allAvailableMoves.white);
  //   const allBlackAvailMoves = JSON.stringify(state.allAvailableMoves.black);

  //   if (allWhiteAvailMoves.includes(JSON.stringify(blackKing))) {
  //     setCheck('Black');
  //   } else if (allBlackAvailMoves.includes(JSON.stringify(whiteKing))) {
  //     setCheck('White');
  //   } else {
  //     setCheck('');
  //   }
  // }, [getSpotDetailsByName, state.allAvailableMoves]);

  // // skips initial render bug and only updates after initial render
  // const didMountRef = useRef(false);
  // useEffect(() => {
  //   if (didMountRef.current) {
  //     let blackKing = getSpotDetailsByName('king', 'black');
  //     let whiteKing = getSpotDetailsByName('king', 'white');
  //     if (!blackKing || !whiteKing) {
  //       setIsGameOver(true);
  //       setTypeOfWin('checkmate');
  //     } else {
  //       setIsGameOver(false);
  //       setTypeOfWin('');
  //     }
  //   } else {
  //     didMountRef.current = true;
  //   }
  // }, [getSpotDetailsByName]);

  const alphaPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numericPosition = [1, 2, 3, 4, 5, 6, 7, 8];
  const renderBoard = numericPosition.map((number, i) => {
    let result = [];
    alphaPosition.map((letter, j) => {
      let spotColor;

      if ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) {
        spotColor = 'beige';
      } else {
        spotColor = 'brown';
      }
      return (
        <Spot
          key={letter + j}
          color={spotColor}
          tile={letter + j}
          x={i + 1}
          y={j}
          setDestination={setDestination}
          destination={state.destination}
          setStartPosition={setStartPosition}
          startPosition={state.startPosition}
          tileFocus={state.tileFocus}
          setTileFocus={setTileFocus}
          availableMoves={state.availableMoves}
          setAvailableMoves={setAvailableMoves}
          killPosition={state.killPosition}
          setKillPosition={setKillPosition}
          castling={state.castling}
          setCastling={setCastling}
          endPawn={state.endPawn}
          setEndPawn={setEndPawn}
          deletePawn={state.deletePawn}
          setDeletePawn={setDeletePawn}
          promotion={state.promotion}
          setPromotion={setPromotion}
          turn={turn}
          setTurn={setTurn}
          setAllAvailableMoves={setAllAvailableMoves}
          activePlayer={activePlayer}
          setActivePlayer={setActivePlayer}
        />
      );
    });
  });

  // useEffect(() => {
  //   const alphaPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  //   const numericPosition = 0;
  //   for (let j = 8; j > numericPosition; j--) {
  //     alphaPosition.forEach((value, i) => {
  //       let spotColor;
  //       if ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) {
  //         spotColor = 'beige';
  //       } else {
  //         spotColor = 'brown';
  //       }

  //       board.push(
  //         <Spot
  //           key={value + j}
  //           color={spotColor}
  //           tile={value + j}
  //           x={i + 1}
  //           y={j}
  //           setDestination={setDestination}
  //           destination={state.destination}
  //           setStartPosition={setStartPosition}
  //           startPosition={state.startPosition}
  //           tileFocus={state.tileFocus}
  //           setTileFocus={setTileFocus}
  //           availableMoves={state.availableMoves}
  //           setAvailableMoves={setAvailableMoves}
  //           killPosition={state.killPosition}
  //           setKillPosition={setKillPosition}
  //           castling={state.castling}
  //           setCastling={setCastling}
  //           endPawn={state.endPawn}
  //           setEndPawn={setEndPawn}
  //           deletePawn={state.deletePawn}
  //           setDeletePawn={setDeletePawn}
  //           promotion={state.promotion}
  //           setPromotion={setPromotion}
  //           turn={turn}
  //           setTurn={setTurn}
  //           setAllAvailableMoves={setAllAvailableMoves}
  //           activePlayer={activePlayer}
  //           setActivePlayer={setActivePlayer}
  //         />,
  //       );
  //       console.log(board);
  //     });
  //   }
  // }, [
  //   activePlayer,
  //   board,
  //   setActivePlayer,
  //   setKillPosition,
  //   setTurn,
  //   state.availableMoves,
  //   state.castling,
  //   state.deletePawn,
  //   state.destination,
  //   state.endPawn,
  //   state.killPosition,
  //   state.promotion,
  //   state.startPosition,
  //   state.tileFocus,
  //   turn,
  // ]);

  return (
    <>
      {/* <div>
        <Promotion endPawn={state.endPawn} setPromotion={setPromotion} />
      </div> */}
      <div className='board'>{renderBoard}</div>
    </>
  );
}
