import { describe, expect, it } from 'vitest';

import { BoardSymbolEnum, BoardSymbolType, RoundStatusEnum } from '@/app/utils/entities/board';
import { calculateRoundResult } from '@/app/utils/functions/calculateRoundResult';

describe('calculateRoundResult', () => {
  it('should return "PENDING" as the current round status', () => {
    const pendingResult: BoardSymbolType[] = [
      '',
      '',
      '',
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerO,
      '',
      BoardSymbolEnum.PlayerO,
      '',
    ];
    expect(calculateRoundResult(pendingResult)).toBe(RoundStatusEnum.Pending);
  });

  it('should return "WIN" as the current round status', () => {
    const pendingResult: BoardSymbolType[] = [
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerO,
      '',
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerX,
      '',
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerO,
      BoardSymbolEnum.PlayerO,
    ];
    expect(calculateRoundResult(pendingResult)).toBe(RoundStatusEnum.Finished);
  });

  it('should return "DRAW" as the current round status', () => {
    const pendingResult: BoardSymbolType[] = [
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerO,
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerO,
      BoardSymbolEnum.PlayerO,
      BoardSymbolEnum.PlayerX,
      BoardSymbolEnum.PlayerO,
    ];
    expect(calculateRoundResult(pendingResult)).toBe(RoundStatusEnum.Draw);
  });
});
