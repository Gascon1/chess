import React, { useEffect, useState, useContext, useRef } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';
import Promotion from 'components/promotion';
import CheckDisplay from 'components/checkDisplay';
import { SpotsContext } from 'context/SpotsContext';
import Timer from 'components/timer';
import Position from 'components/interfaces/position';
import StartPosition from 'components/interfaces/startPosition';

interface Props {
  turn: number;
  activePlayer: string;
  setTurn: Function;
  setActivePlayer: Function;
  promotion: { pieceType: string; color: string };
  setPromotion: Function;
  deletePawn: Position;
  setDeletePawn: Function;
  endPawn: {
    flag: boolean;
    color: string;
  };
  setEndPawn: Function;
  // castling: boolean;
  // setCastling: Function;
  setDestination: Function;
  destination: StartPosition;
  setStartPosition: Function;
  startPosition: StartPosition;
  tileFocus: string;
  setTileFocus: Function;
  availableMoves: {
    x: number;
    y: number;
  }[];
  setAvailableMoves: Function;
}

export default function Board(props: Props) {
  const { getSpotDetailsByName } = useContext(SpotsContext);
  const {
    turn,
    activePlayer,
    setTurn,
    setActivePlayer,
    promotion,
    setPromotion,
    deletePawn,
    setDeletePawn,
    endPawn,
    setEndPawn,
    // castling,
    // setCastling,
    destination,
    setDestination,
    startPosition,
    setStartPosition,
    tileFocus,
    setTileFocus,
    availableMoves,
    setAvailableMoves,
  } = props;

  //TODO: move these states up to app level
  const [state, setState] = useState({
    board: [],
    killPosition: '',
    castling: false,
    allAvailableKillMoves: {
      white: [{ pieceType: '', x: 0, y: 0 }],
      black: [{ pieceType: '', x: 0, y: 0 }],
    },
    check: '',
    isGameOver: false,
    typeOfWin: '',
  });

  function setAllAvailableKillMoves(color: string, pieceType: string, availableMove: any) {
    // WHITE CASE
    if (availableMove?.length > 0 && color === 'white') {
      setState((prev) => {
        let whiteCopy = prev.allAvailableKillMoves.white.slice();
        // whiteCopy.push(...availableMove);
        for (let whiteMove of availableMove) {
          let whiteObj = {
            pieceType: pieceType,
            x: whiteMove.x,
            y: whiteMove.y,
          };
          whiteCopy.push(whiteObj);
        }
        // whiteCopy = whiteCopy.filter(
        //   (item, index, self) => index === self.findIndex((w) => w.x === item.x && w.y === item.y),
        // );
        return {
          ...prev,
          allAvailableKillMoves: {
            ...prev.allAvailableKillMoves,
            white: [...whiteCopy],
          },
        };
      });
    }
    // BLACK CASE
    if (availableMove?.length > 0 && color === 'black') {
      setState((prev) => {
        let blackCopy = prev.allAvailableKillMoves.black.slice();
        // blackCopy.push(...availableMove);
        for (let blackMove of availableMove) {
          let blackObj = {
            pieceType: pieceType,
            x: blackMove.x,
            y: blackMove.y,
          };
          blackCopy.push(blackObj);
        }
        // blackCopy = blackCopy.filter(
        //   (item, index, self) => index === self.findIndex((w) => w.x === item.x && w.y === item.y),
        // );
        return {
          ...prev,
          allAvailableKillMoves: {
            ...prev.allAvailableKillMoves,
            black: [...blackCopy],
          },
        };
      });
    }

    if (availableMove === null && color === 'white') {
      setState((prev) => ({
        ...prev,
        allAvailableKillMoves: {
          ...prev.allAvailableKillMoves,
          white: [],
        },
      }));
    }
    if (availableMove === null && color === 'black') {
      setState((prev) => ({
        ...prev,
        allAvailableKillMoves: {
          ...prev.allAvailableKillMoves,
          black: [],
        },
      }));
    }
  }

  function setCastling(boolean: boolean) {
    setState((prev) => ({
      ...prev,
      castling: boolean,
    }));
  }

  const setKillPosition = (tileInfo: Position, castling: boolean, promotion: boolean) => {
    if (tileFocus !== tileInfo.tile) {
      setState((prev) => ({ ...prev, killPosition: tileFocus }));
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

  const setCheck = (colour: string) => {
    setState((prev) => ({ ...prev, check: colour }));
  };

  function setIsGameOver(flag: boolean) {
    setState((prev) => ({
      ...prev,
      isGameOver: flag,
    }));
  }

  function setTypeOfWin(condition: string) {
    setState((prev) => ({
      ...prev,
      typeOfWin: condition,
    }));
  }
  // responsible for check
  useEffect(() => {
    let blackKing = getSpotDetailsByName('king', 'black');
    let whiteKing = getSpotDetailsByName('king', 'white');
    let acc = 0;

    // const allWhiteAvailMoves = JSON.stringify(state.allAvailableKillMoves.white);
    // const allBlackAvailMoves = JSON.stringify(state.allAvailableKillMoves.black);
    // if (allWhiteAvailMoves.includes(JSON.stringify(blackKing))) {
    //   setCheck('Black');
    // } else if (allBlackAvailMoves.includes(JSON.stringify(whiteKing))) {
    //   setCheck('White');
    // } else {
    //   setCheck('');
    // }

    if (blackKing && whiteKing && state.allAvailableKillMoves) {
      for (let move in state.allAvailableKillMoves.white) {
        if (
          blackKing.x === state.allAvailableKillMoves.white[move].x &&
          blackKing.y === state.allAvailableKillMoves.white[move].y
        ) {
          acc++;
          setCheck('Black');
          // let blackKingMoves = state.allAvailableKillMoves.black.filter((kingMove) =>
          //   JSON.stringify(kingMove.pieceType).includes('king'),
          // );
          // let allowableMove = false;
          // for (let kingMove of blackKingMoves) {
          //   let coveredMove = false;
          //   for (let stateMove of state.allAvailableKillMoves.white) {
          //     if (kingMove.x === stateMove.x && kingMove.y === stateMove.y) {
          //       coveredMove = true;
          //     }
          //   }
          //   if (!coveredMove) {
          //     allowableMove = true;
          //   }
          // }
          // if (allowableMove) {
          //   setCheck('Black');
          // } else {
          //   setIsGameOver(true);
          //   setTypeOfWin('checkmate');
          // }
        }
      }
      for (let move in state.allAvailableKillMoves.black) {
        if (
          whiteKing.x === state.allAvailableKillMoves.black[move].x &&
          whiteKing.y === state.allAvailableKillMoves.black[move].y
        ) {
          acc++;
          setCheck('White');
        }
      }
      if (acc === 0) {
        setCheck('');
      }
    }
  }, [getSpotDetailsByName, state.allAvailableKillMoves]);

  // skips initial render bug and only updates after initial render
  // responsible for checkmate
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      let blackKing = getSpotDetailsByName('king', 'black');
      let whiteKing = getSpotDetailsByName('king', 'white');
      if (!blackKing || !whiteKing) {
        setIsGameOver(true);
        setTypeOfWin('checkmate');
      } else {
        setIsGameOver(false);
        setTypeOfWin('');
      }
    } else {
      didMountRef.current = true;
    }
  }, [getSpotDetailsByName]);

  
  useEffect(() => {
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

        board.push(
          <Spot
            key={value + j}
            color={spotColor}
            tile={value + j}
            x={i + 1}
            y={j}
            setDestination={setDestination}
            destination={destination}
            setStartPosition={setStartPosition}
            startPosition={startPosition}
            tileFocus={tileFocus}
            setTileFocus={setTileFocus}
            availableMoves={availableMoves}
            setAvailableMoves={setAvailableMoves}
            killPosition={state.killPosition}
            setKillPosition={setKillPosition}
            castling={state.castling}
            setCastling={setCastling}
            endPawn={endPawn}
            setEndPawn={setEndPawn}
            deletePawn={deletePawn}
            setDeletePawn={setDeletePawn}
            promotion={promotion}
            setPromotion={setPromotion}
            turn={turn}
            setTurn={setTurn}
            setAllAvailableKillMoves={setAllAvailableKillMoves}
            setActivePlayer={setActivePlayer}
          />,
        );
      });
    }
    setState((prev) => ({ ...prev, board }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    destination,
    startPosition,
    availableMoves,
    state.killPosition,
    tileFocus,
    state.castling,
    endPawn,
    deletePawn,
    promotion,
  ]);

  return (
    <div className='viewport'>
      <div className='content-container'>
        <div className='board-container'>
          <div className='timer-container'>
            <Timer
              turn={turn}
              colour={'black'}
              setIsGameOver={setIsGameOver}
              setTypeOfWin={setTypeOfWin}
            />
            <Timer
              turn={turn}
              colour={'white'}
              setIsGameOver={setIsGameOver}
              setTypeOfWin={setTypeOfWin}
            />
          </div>
          <div className='board-with-addons'>
            <CheckDisplay
              check={state.check}
              isGameOver={state.isGameOver}
              typeOfWin={state.typeOfWin}
            />
            <div className='board'>{state.board}</div>
            <Promotion endPawn={endPawn} setPromotion={setPromotion} />
          </div>
        </div>
      </div>
    </div>
  );
}
