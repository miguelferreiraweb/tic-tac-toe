export type BoardSymbolType = BoardSymbolEnum | '';
export type RoundStatusType = RoundStatusEnum;

export enum RoundStatusEnum {
  Finished = 'Finished',
  Draw = 'DRAW',
  Pending = 'PENDING',
}

export enum BoardSymbolEnum {
  PlayerX = 'X',
  PlayerO = 'O',
}
