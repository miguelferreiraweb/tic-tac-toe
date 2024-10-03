import {
  FINISH_ROUND,
  UPDATE_BOARD,
  UPDATE_CURRENT_PLAYER,
  UPDATE_ROUND_STATUS,
} from '@/store/Game/gameTypes';
import { BoardSymbolType, RoundStatusType } from '@/utils/entities/board';

export const getFinishRoundAction = (isRoundFinished: boolean) => ({
  type: FINISH_ROUND,
  payload: { isRoundFinished },
});

export const getUpdateCurrentPlayerAction = (currentPlayer: BoardSymbolType) => ({
  type: UPDATE_CURRENT_PLAYER,
  payload: { currentPlayer },
});

export const getUpdateBoardAction = (board: BoardSymbolType[]) => ({
  type: UPDATE_BOARD,
  payload: { board },
});

export const getUpdateRoundStatusAction = (roundStatus: RoundStatusType) => ({
  type: UPDATE_ROUND_STATUS,
  payload: { roundStatus },
});
