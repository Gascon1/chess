import { createContext } from 'react';
// import { stringify } from 'querystring';

export interface Spots {
  activePiece: {
    pieceType: string;
    color: string;
  };
  tileInfo: {
    tile: string;
    x: number;
    y: number;
  };
  isOccupied: boolean;
  isCircleVisible: boolean;
  hasMoved: boolean;
}

export interface SpotsContext {
  spots: {
    activePiece: {
      pieceType: string;
      color: string;
    };
    tileInfo: {
      tile: string;
      x: number;
      y: number;
    };
    isOccupied: boolean;
    isCircleVisible: boolean;
    hasMoved: boolean;
  };

  setSpotsContext: (spots: any) => void;
  initSpotsContext: (spots: any) => void;
  getSpotDetails: (x: number, y: number) => Spots;
}

export const spotsDefaultValue = {
  spots: [
    {
      activePiece: {
        pieceType: '',
        color: '',
      },
      tileInfo: {
        tile: '',
        x: 0,
        y: 0,
      },
      isOccupied: false,
      isCircleVisible: false,
      hasMoved: false,
    },
  ],
  setSpotsContext: (spots: any) => {},
  initSpotsContext: (spots: any) => {},
  getSpotDetails: (x: number, y: number): Spots | undefined => ({
    activePiece: { pieceType: '', color: '' },
    tileInfo: { tile: '', x: 0, y: 0 },
    isOccupied: false,
    isCircleVisible: false,
    hasMoved: false,
  }),
  getSpotDetailsByName: (name: string, color: string): any => ({ x: 0, y: 0 }),
};

export const SpotsContext = createContext(spotsDefaultValue);
