export type BoardSymbolType = BoardSymbolEnum | '';
export type RoundStatusType = RoundStatusEnum;

export enum RoundStatusEnum {
  Win = 'WIN',
  Draw = 'DRAW',
  Pending = 'PENDING',
}

export enum BoardSymbolEnum {
  PlayerX = 'X',
  PlayerO = 'O',
}
