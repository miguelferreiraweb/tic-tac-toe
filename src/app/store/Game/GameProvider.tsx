'use client';

import React, { createContext, ReactNode, useReducer } from 'react';

import { gameReducer } from '@/store/Game/gameReducers';
import { BOARD_INITIAL_STATE } from '@/utils/constants/board';
import { BoardSymbolType, RoundStatusEnum, RoundStatusType } from '@/utils/entities/board';

export interface GameContextState {
  currentPlayer: BoardSymbolType;
  isRoundFinished: boolean;
  board: BoardSymbolType[];
  roundStatus: RoundStatusType;
}

const initialState: GameContextState = {
  currentPlayer: 'X' as BoardSymbolType,
  isRoundFinished: false,
  board: BOARD_INITIAL_STATE,
  roundStatus: RoundStatusEnum.Pending,
};

export interface Action {
  type: string;
  payload?: Partial<GameContextState>;
}

export const GameContext = createContext<{
  state: GameContextState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};
