import { Action, GameContextState } from '@/store/Game/GameProvider';
import {
  FINISH_ROUND,
  UPDATE_BOARD,
  UPDATE_CURRENT_PLAYER,
  UPDATE_ROUND_STATUS,
} from '@/store/Game/gameTypes';

export const gameReducer = (state: GameContextState, action: Action): GameContextState => {
  switch (action.type) {
    case FINISH_ROUND:
      return {
        ...state,
        isRoundFinished: action?.payload?.isRoundFinished ?? state.isRoundFinished,
      };
    case UPDATE_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action?.payload?.currentPlayer ?? state.currentPlayer,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        board: action?.payload?.board ?? state.board,
      };
    case UPDATE_ROUND_STATUS:
      return {
        ...state,
        roundStatus: action?.payload?.roundStatus ?? state.roundStatus,
      };
    default:
      return state;
  }
};
