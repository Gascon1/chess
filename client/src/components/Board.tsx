import React, { useEffect, useState, useContext, useRef } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';
import Promotion from 'helpers/promotion';
import CheckDisplay from 'helpers/checkDisplay';
import { SpotsContext } from 'context/SpotsContext';
import Timer from 'helpers/timer';

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
}

export default function Board(props: Props) {
  const { getSpotDetailsByName } = useContext(SpotsContext);
  const { turn, activePlayer, setTurn, setActivePlayer } = props;

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
    check: '',
    isGameOver: false,
    typeOfWin: '',
  });

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

  useEffect(() => {
    let blackKing = getSpotDetailsByName('king', 'black');
    let whiteKing = getSpotDetailsByName('king', 'white');

    const allWhiteAvailMoves = JSON.stringify(state.allAvailableMoves.white);
    const allBlackAvailMoves = JSON.stringify(state.allAvailableMoves.black);

    if (allWhiteAvailMoves.includes(JSON.stringify(blackKing))) {
      setCheck('Black');
    } else if (allBlackAvailMoves.includes(JSON.stringify(whiteKing))) {
      setCheck('White');
    } else {
      setCheck('');
    }
  }, [getSpotDetailsByName, state.allAvailableMoves]);

  // skips initial render bug and only updates after initial render
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
          />,
        );
      });
    }
    setState((prev) => ({ ...prev, board }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.destination,
    state.startPosition,
    state.availableMoves,
    state.killPosition,
    state.tileFocus,
    state.castling,
    state.endPawn,
    state.deletePawn,
    state.promotion,
  ]);

  return (
    <div className='viewport'>
      <Timer turn={turn} />
      <CheckDisplay check={state.check} isGameOver={state.isGameOver} typeOfWin={state.typeOfWin} />
      <div className='board'>{state.board}</div>
      <Promotion endPawn={state.endPawn} setPromotion={setPromotion} />
    </div>
  );
}
