import React, { useEffect, useState } from 'react';
import isEven from 'helpers/isEven';
import Spot from 'components/Spot';
import Promotion from 'helpers/promotion';

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
  isRoundOver: boolean;
  isGameOver: boolean;
  setTurn: Function;
}

export default function Board(props: Props) {
  const { turn, activePlayer, isRoundOver, isGameOver, setTurn } = props;

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

  function setAllAvailableMoves(color: string, availableMove?: any) {
    if (availableMove?.length > 0 && color === 'white') {
      let whiteCopy = state.allAvailableMoves.white.slice();
      whiteCopy.push(...availableMove);
      whiteCopy.filter((item, index) => whiteCopy.indexOf(item) === index);
      setState((prev) => ({
        ...prev,
        allAvailableMoves: {
          ...prev.allAvailableMoves,
          white: [...whiteCopy],
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        allAvailableMoves: {
          ...prev.allAvailableMoves,
          white: [],
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
    // if (state.tileFocus !== tileInfo.tile) {
    //   setState((prev) => ({ ...prev, killPosition: state.tileFocus }));
    // }
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
            allAvailableMoves={state.allAvailableMoves}
            setAllAvailableMoves={setAllAvailableMoves}
            activePlayer={activePlayer}
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
      <div className='board'>{state.board}</div>
      <Promotion endPawn={state.endPawn} setPromotion={setPromotion} />
    </div>
  );
}
